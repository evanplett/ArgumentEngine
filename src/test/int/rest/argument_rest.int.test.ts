import { createConnection, getConnection, Entity, getRepository, Connection } from 'typeorm';

import { MyConnectionManager } from '../../../business_model_typeorm/manager';

import { ModelArgument, ReasoningMethod } from '../../../business_model_typeorm/entity/Argument';
import { ModelStatement } from '../../../business_model_typeorm/entity/Statement';

import { TestUtils, ArgumentParams } from './test_utils';

import * as request from 'supertest';

import { RestApp } from '../../../rest/app';
import { expect } from 'chai';
import { TestCase, DB_STATE, REQUEST_TYPE, TestCondition, TestResult } from './test_case';

import { DiffComparison, ConditionComparison, ConditionLength } from './test_case_assesments';

let testCases: TestCase[] = [];

// get
TestUtils.AddTestCases(
    testCases,
    new TestCondition(
        REQUEST_TYPE.GET,
        '',
        {},
        'no URL'),
    new Map([
        [ DB_STATE.EMPTY_DB, new TestResult(
            404,
            new DiffComparison({ message: 'Route \'/\' not found.'}),
            '404 and error message')],
        [ DB_STATE.FULL_DB, new TestResult(
            404,
            new DiffComparison({ message: 'Route \'/\' not found.'}),
            '404 and error message')]
    ])
);

TestUtils.AddTestCases(
    testCases,
    new TestCondition(
        REQUEST_TYPE.GET,
        '/argument',
        {},
        'argument with no parameters'),
    new Map([
        [ DB_STATE.EMPTY_DB, new TestResult(
            400,
            new DiffComparison({  errorCode: 400, errorDetail: 'No Arguments after id 0 found'}),
            'code 400 and error message')],
         [ DB_STATE.FULL_DB, new TestResult(
            200,
            new ConditionComparison([ new ConditionLength(15) ]),
            '404 and error message')]
    ])
);

TestUtils.AddTestCases(
    testCases,
    new TestCondition(
        REQUEST_TYPE.GET,
        '/argument',
        { limit: '10'},
        'argument with limit = 10'),
    new Map([
        [ DB_STATE.EMPTY_DB, new TestResult(
            400,
            new DiffComparison({  errorCode: 400, errorDetail: 'No Arguments after id 0 found'}),
            'code 400 and error message')],
        // [ DB_STATE.FULL_DB, new TestResult(404,{ message: 'Route \'/\' not found.'},'404 and error message')]
    ])
);

TestUtils.AddTestCases(
    testCases,
    new TestCondition(
        REQUEST_TYPE.GET,
        '/argument/0/tree',
        { max_depth: '10'},
        'argument tree with id = 0 and max_depth = 10'),
    new Map([
        [ DB_STATE.EMPTY_DB, new TestResult(
            400,
            new DiffComparison({  errorCode: 400, errorDetail: 'No Argument with id 0 found'}),
            'code 400 and error message')],
        // [ DB_STATE.FULL_DB, new TestResult(404,{ message: 'Route \'/\' not found.'},'404 and error message')]
    ])
);

// post
TestUtils.AddTestCases(
    testCases,
    new TestCondition(
        REQUEST_TYPE.POST,
        '/argument',
        new ArgumentParams('My Conclusion', [ 'Premise 1', 'Premise 2' ], 'Induction'),
        'argument from valid new argument'),
    new Map([
        [ DB_STATE.EMPTY_DB, new TestResult(
            200,
            new DiffComparison({  errorCode: 400, errorDetail: 'No Argument with id 0 found'}),
            'code 200 and error message')],
        // [ DB_STATE.FULL_DB, new TestResult(404,{ message: 'Route \'/\' not found.'},'404 and error message')]
    ])
);

const app = RestApp();

[DB_STATE.EMPTY_DB, DB_STATE.FULL_DB].forEach(dbState => {
    describe(`With a(n) ${dbState} database`, function(): void {
        const testCasesForDbState = testCases.filter(testCase => testCase.state === dbState);

        beforeEach(() => {
            return MyConnectionManager.SetCurrentConnection(TestUtils.DetermineTestingDB()).then((connection): Promise<any> => {
                if (dbState === DB_STATE.FULL_DB) {
                    return TestUtils.CreateNode(connection, 4);
                } else {
                    return Promise.resolve();
                }
            });
        });

        afterEach(() => {
            let conn = MyConnectionManager.GetCurrentConnection();
            return conn.close();
        });

        describe('GET Argument', function(): void {
            testCasesForDbState
            .filter(testCase => testCase.testCondition.request.request_type === REQUEST_TYPE.GET)
            .forEach(function(testCase: TestCase): void {
                it(testCase.GetDescription(), function(): request.Test | undefined {
                    const httpMethod = TestUtils.CreateHTTPMethod(testCase.testCondition.request, request(app));

                    if (httpMethod) {
                        return httpMethod
                        .query(testCase.testCondition.data)
                        .type('json')
                        .set('Accept', 'application/json')
                        .expect('Content-Type', /json/)
                        .expect(testCase.expectedResult.response_code)
                        .expect((res) => {
                            const difference = testCase.expectedResult.assessment.Compare(res.body);
                            if (difference.length !== 0) {
                                throw new Error(difference);
                            }
                        });
                    } else {
                        return undefined;
                    }
                });
            });
        });

        describe('POST Argument', function(): void {
            testCasesForDbState
            .filter(testCase => testCase.testCondition.request.request_type === REQUEST_TYPE.POST)
            .forEach(function(testCase: TestCase): void {
                it(testCase.GetDescription(), function(): request.Test | undefined {
                    const httpMethod = TestUtils.CreateHTTPMethod(testCase.testCondition.request, request(app));

                    if (httpMethod) {
                        return httpMethod
                        .send(testCase.testCondition.data)
                        .type('json')
                        .set('Accept', 'application/json')
                        .expect('Content-Type', /json/)
                        .expect(testCase.expectedResult.response_code)
                        .expect((res) => {
                            let errors: string[] =
                                TestUtils.DoesArgumentMatchArgElements(testCase.testCondition.data as ArgumentParams, res.body);
                            if (errors.length > 0) throw new Error(errors.map((error) => '\n - ' + error).join(''));
                        });
                    } else {
                        return undefined;
                    }
                });
            });
        });
    });
});
