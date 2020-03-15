import {
  ModelArgument,
  ReasoningMethod
} from '../../../business_model_typeorm/entity/Argument';

import {
  ModelStatement
} from '../../../business_model_typeorm/entity/Statement';

import { Connection } from 'typeorm';


import { APIRequest, TestCase, TestCondition, DB_STATE, REQUEST_TYPE, TestResult } from './test_case';

import { diff, addedDiff, deletedDiff, updatedDiff, detailedDiff } from 'deep-object-diff';

import * as request from 'supertest';

export class ArgumentParams {

  conclusion: string;
  premises: string [];
  reasoning_method: string;

  constructor(conclusion: string, premises: string[], reasoning_method: string) {
    this.conclusion = conclusion;
    this.premises = premises;
    this.reasoning_method = reasoning_method;
  }
}

export class TestUtils {

  // returns an array of strings that describe the differences
  static DoesArgumentMatch(conclusion: string, premises: string[], reasoning_method: string, argument: ModelArgument): string [] {

    let errors: string [] = [];

    if (argument.conclusion.text !== conclusion) {
      let error: string = 'Conclusion: Exp: \'' + conclusion + '\' != Act: \'' + argument.conclusion.text + '\'';
      errors.push(error);
    }

    if (argument.reasoning_method !== reasoning_method) {
      let error: string = 'ReasoningMethod: Exp: \'' + conclusion + '\' != Act: \'' + argument.conclusion.text + '\'';
      errors.push(error);
    }

    if (!(premises.length === argument.premises.length
        && argument.premises.sort().every(function(value: ModelStatement, index: number): boolean {
      return premises.some(x => x === value.text); }))) {

      let expPremises: string = premises.map(value => '\'' + value + '\'').join(',');
      let actPremises: string = argument.premises.map(value => '\'' + value.text + '\'').join(',');
      let error: string = 'Premises: Exp: [' + expPremises + '] != Act: [' + actPremises + ']';
      errors.push(error);
    }

    return errors;
  }

  static DoesArgumentMatchArgElements(argElements: ArgumentParams, argument: ModelArgument): string [] {
    return TestUtils.DoesArgumentMatch(argElements.conclusion, argElements.premises, argElements.reasoning_method, argument);
  }

  static CreateHTTPMethod(testRequest: APIRequest, superTest: request.SuperTest<request.Test>): request.Test| undefined {
      switch (testRequest.request_type) {
            case REQUEST_TYPE.GET:
                return superTest.get(testRequest.request_url);
            case REQUEST_TYPE.DELETE:
                return superTest.delete(testRequest.request_url);
            case REQUEST_TYPE.POST:
                return superTest.post(testRequest.request_url);
            case REQUEST_TYPE.PUT:
                return superTest.put(testRequest.request_url);
            default:
                return undefined;
      }
  }

  static CompareResponseToExpected(response: object, expected: object): object {
    return diff(response, expected);
  }

  static async CreateNode(
        connection: Connection,
        max_level: number,
        current_level: number = 0,
        path: string = ''
    ): Promise<ModelStatement> {
        let conclusion: ModelStatement = connection.manager.create(ModelStatement, { text: 'Conclusion ' + path });

        await connection.manager.save(conclusion);

        if (current_level < max_level) {
            let leftNode: ModelStatement = await TestUtils.CreateNode(connection, max_level, current_level + 1, path + 'L');

            let rightNode: ModelStatement = await TestUtils.CreateNode(connection, max_level, current_level + 1, path + 'R');

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

  static AddTestCases(testCases: TestCase[], condition: TestCondition, results: Map<DB_STATE, TestResult>): void {
      results.forEach( (result, db_state) => {
          testCases.push(new TestCase(db_state, condition, result));
      });
  }

}
