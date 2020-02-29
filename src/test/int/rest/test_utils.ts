import {
  ModelArgument
} from '../../../business_model_typeorm/entity/Argument';

import {
  ModelStatement
} from '../../../business_model_typeorm/entity/Statement';


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



export class TestCase {
    state : TestCase.DB_STATE;
    testCondition = class {
        request = class {
            request_type: TestCase.REQUEST_TYPE;
            request_url: string;

            constructor(request_type: TestCase.REQUEST_TYPE, 
                request_url: string) {

            }
        }
        query: object;
    }
    expectedResult = class {
        response_code: number;
        response_object: object;

        constructor(response_code: number, response_object: object) {
            this.response_code = response_code;
            this.response_object = response_object;
        }
    }

    constructor(state: TestCase.DB_STATE, 
                request_type: TestCase.REQUEST_TYPE, 
                request_url: string,
                response_code: number,
                response_object: object) {

    }

}

export module TestCase {

    export enum DB_STATE {
        EMPTY_DB,
        FULL_DB
    }

    export enum REQUEST_TYPE {
        GET,
        POST,
        PUSH,
        DELETE
    }
}

export class TestUtils {

  // eeturns an array of strings that describe the differences
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



}
