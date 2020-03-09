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
    {
        description: 'A test case',
        testCondition:
        {
            state: DB_STATE.EMPTY_DB,
            request: {
                request_type: REQUEST_TYPE.GET,
                request_url: ''
            },
            query: {}
        },
        expectedResult: {
            response_code: 404,
            response_object: {}
        }
    },








    {
        description: 'with no parameters, respond with code 400 and error message',
        testCondition:
        {
            state: DB_STATE.EMPTY_DB,
            request: {
                request_type: REQUEST_TYPE.GET,
                request_url: '/argument'
            },
            query: {}
        },
        expectedResult: {
            response_code: 400,
            response_object: {
                errorCode: 400,
                errorDetail: 'No Arguments after id 0 found'
            }
        }
    },

    new TestCase('with after_id = 10, respond with code 400 and error message',
                 DB_STATE.EMPTY_DB,
                 REQUEST_TYPE.GET,
                 '/argument',
                 {limit: '10'},
                 400,
                 {
					errorCode: 400,
					errorDetail: 'No Arguments after id 0 found'
				})

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
		it('with no parameters, respond with code 400 and error message', function(): any {
			return request(app)
				.get('/argument')
				.set('Accept', 'application/json')
				.expect('Content-Type', /json/)
				.expect(400, {
					errorCode: 400,
					errorDetail: 'No Arguments after id 0 found'
				});
		});
		it('with after_id = 10, respond with code 400 and error message', function(): any {
			return request(app)
				.get('/argument')
				.query({
					after_id: '10'
				})
				.set('Accept', 'application/json')
				.expect('Content-Type', /json/)
				.expect(400, {
					errorCode: 400,
					errorDetail: 'No Arguments after id 10 found'
				});
		});
		it('with limit = 10, respond with code 400 and error message', function(): any {
			return request(app)
				.get('/argument')
				.query({
					limit: '10'
				})
				.type('json')
				.accept('json')
				.expect(400, {
					errorCode: 400,
					errorDetail: 'No Arguments after id 0 found'
				});
		});
		it('with after_id = 10 and limit = 10, respond with code 400 and error message', function(): any {
			return request(app)
				.get('/argument')
				.query({
					limit: '10',
					after_id: '10'
				})
				.type('json')
				.accept('json')
				.expect(400, {
					errorCode: 400,
					errorDetail: 'No Arguments after id 10 found'
				});
		});

		it('tree with id = 0 and max_depth = 10, respond with code 400 and error message', function(): any {
			let id: number = 0;

			return request(app)
				.get(`/argument/${id}/tree`)
				.query({
					max_depth: '10'
				})
				.type('json')
				.accept('json')
				.expect(400, {
					errorCode: 400,
					errorDetail: 'No Argument with id 0 found'
				});
		});
	});

	describe('POST Argument', function(): void {
		it('with valid new argument, respond with code 200 and error message', function(): any {
			let newArg = new ArgumentParams('My Conclusion', [ 'Premise 1', 'Premise 2' ], 'Induction');

			return request(app).post('/argument').type('json').send(newArg).accept('json').expect(200).expect((res) => {
				let errors: string[] = TestUtils.DoesArgumentMatchArgElements(newArg, res.body);

				if (errors.length > 0) throw new Error(errors.map((error) => '\n - ' + error).join(''));
			});
		});
    });

	describe('Test Cases From Array', function(): void {
        testCases.forEach(function(testCase: TestCase): void {
            it(testCase.description, function(): request.Test | undefined {
                const httpMethod = TestUtils.CreateHTTPMethod(testCase.testCondition.request, request(app));

                if (httpMethod) {
                    return httpMethod
                    .query(testCase.testCondition.query)
                    .type('json')
                    .set('Accept', 'application/json')
				    // .expect('Content-Type', /json/) Need to add this back in but 404 still comes as HTML
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
});


// describe('With an filled-in database', function(): void {
// 	beforeEach(() => {
//         let dbToUse = process.env.USER = 'gitpod' ? 'gitpod' : 'testing';
//         return MyConnectionManager.SetCurrentConnection(dbToUse).then((connection) => {
// 			return CreateNode(connection, 4);
// 		});
// 	});

// 	afterEach(() => {
// 		let conn = MyConnectionManager.GetCurrentConnection();
// 		return conn.close();
// 	});

// 	describe('GET Argument', function(): void {
// 		it('with no parameters, respond with code 200 and error message', function(): any {
// 			return request(app)
// 				.get('/argument')
// 				.set('Accept', 'application/json')
// 				.expect('Content-Type', /json/)
// 				.expect(200)
// 				.expect((response) => {
// 				  expect(response.body.length).to.equal(15);
// 				}); /* ignore
// 				.expect((response) => {
// 				  expect(response).to.equal({ 'bob' : '15'});
// 				  let count = response.body.reduce((acc, cur) => cur.id === id ? ++acc : acc, 0);
// 				});
// 		*/});

// 		it('tree with id = 0 and max_depth = 10, respond with code 400 and error message', function(): any {
// 			let id: number = 0;

// 			return request(app)
// 				.get(`/argument/${id}`)
// 				.type('json')
// 				.accept('json')
// 				.expect(200, {
// 					errorCode: 400,
// 					errorDetail: 'No Argument with id 0 found'
// 				});
// 		});
// 	});
// });
