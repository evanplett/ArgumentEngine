import { createConnection, getConnection, Entity, getRepository, Connection } from 'typeorm';

import { MyConnectionManager } from '../../../business_model_typeorm/manager';

import { ModelArgument, ReasoningMethod } from '../../../business_model_typeorm/entity/Argument';
import { ModelStatement } from '../../../business_model_typeorm/entity/Statement';

import { TestUtils, ArgumentParams } from './test_utils';

import * as request from 'supertest';

import { RestApp } from '../../../rest/app';
import { expect } from 'chai';
import { TestCase, DB_STATE, REQUEST_TYPE } from './test_case';

const testCases: TestCase[] = [
    // get
    new TestCase('With no URL',
                 DB_STATE.EMPTY_DB,
                 REQUEST_TYPE.GET,
                 '',
                 {},
                 404,
                 { message: 'Route \'/\' not found.'}),

    new TestCase('with no parameters, respond with code 400 and error message',
                 DB_STATE.EMPTY_DB,
                 REQUEST_TYPE.GET,
                 '/argument',
                 {},
                 400,
                 {  errorCode: 400,
					errorDetail: 'No Arguments after id 0 found'}),

    new TestCase('with limit = 10, respond with code 400 and error message',
                 DB_STATE.EMPTY_DB,
                 REQUEST_TYPE.GET,
                 '/argument',
                 {  limit: '10'},
                 400,
                 {  errorCode: 400,
                    errorDetail: 'No Arguments after id 0 found'}),

    new TestCase('with after_id = 10, respond with code 400 and error message',
                 DB_STATE.EMPTY_DB,
                 REQUEST_TYPE.GET,
                 '/argument',
                 {  after_id: '10'},
                 400,
                 {  errorCode: 400,
                    errorDetail: 'No Arguments after id 10 found'}),

    new TestCase('with after_id = 10 and limit = 10, respond with code 400 and error message',
                 DB_STATE.EMPTY_DB,
                 REQUEST_TYPE.GET,
                 '/argument',
                 {  after_id: '10',
                    limit: '10'},
                 400,
                 {  errorCode: 400,
                    errorDetail: 'No Arguments after id 10 found'}),

    new TestCase('tree with id = 0 and max_depth = 10, respond with code 400 and error message',
                 DB_STATE.EMPTY_DB,
                 REQUEST_TYPE.GET,
                 '/argument/0/tree',
                 {  max_depth: '10'},
                 400,
                 {  errorCode: 400,
                    errorDetail: 'No Argument with id 0 found'}),

    // post
    new TestCase('with valid new argument, respond with code 200 and error message',
                 DB_STATE.EMPTY_DB,
                 REQUEST_TYPE.POST,
                 '/argument',
                 new ArgumentParams('My Conclusion', [ 'Premise 1', 'Premise 2' ], 'Induction'),
                 200,
                 {  errorCode: 400,
                    errorDetail: 'No Argument with id 0 found'})
];



const app = RestApp();

async function CreateNode(
	connection: Connection,
	max_level: number,
	current_level: number = 0,
	path: string = ''
): Promise<ModelStatement> {
	let conclusion: ModelStatement = connection.manager.create(ModelStatement, { text: 'Conclusion ' + path });

	await connection.manager.save(conclusion);

	if (current_level < max_level) {
		let leftNode: ModelStatement = await CreateNode(connection, max_level, current_level + 1, path + 'L');

		let rightNode: ModelStatement = await CreateNode(connection, max_level, current_level + 1, path + 'R');

		let argument: ModelArgument = connection.manager.create(ModelArgument, {
			conclusion: conclusion,
			premises: [ leftNode, rightNode ],
			reasoning_method: ReasoningMethod.Induction
		});

		await connection.manager.save(argument);
	}

	return new Promise<ModelStatement>((resolve) => {
		resolve(conclusion);
	});
}

describe('With an empty database', function(): void {
	beforeEach(() => {
        if (process.env.USER = 'gitpod') {
            return MyConnectionManager.SetCurrentConnection('gitpod');
        } else {
            return MyConnectionManager.SetCurrentConnection('testing');
        }
	});

	afterEach(() => {
		let conn = MyConnectionManager.GetCurrentConnection();
		return conn.close();
	});

	describe('GET Argument', function(): void {
        testCases
        .filter(testCase => testCase.testCondition.request.request_type === REQUEST_TYPE.GET)
        .forEach(function(testCase: TestCase): void {
            it(testCase.description, function(): request.Test | undefined {
                const httpMethod = TestUtils.CreateHTTPMethod(testCase.testCondition.request, request(app));

                if (httpMethod) {
                    return httpMethod
                    .query(testCase.testCondition.data)
                    .type('json')
                    .set('Accept', 'application/json')
				    .expect('Content-Type', /json/)
                    .expect(testCase.expectedResult.response_code)
                    .expect((res) => {

                        const difference = TestUtils.CompareResponseToExpected(res.body, testCase.expectedResult.response_object);

                        if (Object.keys(difference).length !== 0) {
                            const expectedString = JSON.stringify(testCase.expectedResult.response_object);
                            const resultString = JSON.stringify(res.body);
                            const differenceString = JSON.stringify(difference);

                            throw new Error(`Expected: ${expectedString} \nResult: ${resultString}`);
                        }
                    });
                } else {
                    return undefined;
                }
            });
        });
	});

	describe('POST Argument', function(): void {
        testCases
        .filter(testCase => testCase.testCondition.request.request_type === REQUEST_TYPE.POST)
        .forEach(function(testCase: TestCase): void {
            it(testCase.description, function(): request.Test | undefined {
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
