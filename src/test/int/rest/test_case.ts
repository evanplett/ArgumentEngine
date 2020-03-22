import { diff, addedDiff, deletedDiff, updatedDiff, detailedDiff } from 'deep-object-diff';

export enum DB_STATE {
    EMPTY_DB = 'Empty Database',
    FULL_DB = 'Full Database'
}

export enum REQUEST_TYPE {
    GET,
    POST,
    PUT,
    DELETE
}

export class APIRequest {
    request_type: REQUEST_TYPE;
    request_url: string;

    constructor(request_type: REQUEST_TYPE, request_url: string) {
        this.request_type = request_type;
        this.request_url = request_url;
    }
}

export class TestCondition {
    request: APIRequest;
    data: object;
    description: string;

    constructor(request_type: REQUEST_TYPE, request_url: string, data: object, description: string) {
        this.request = new APIRequest(request_type, request_url);
        this.data = data;
        this.description = description;
    }
}

interface TestResultAssesment {
    Compare(actualResult: object): string;
}

export class DiffComparison implements TestResultAssesment {
    expectedResult: object;

    constructor(expectedResult: object) {
        this.expectedResult = expectedResult;
    }

    Compare(actualResult: object): string {
        const difference = diff(actualResult, this.expectedResult);

        if (Object.keys(difference).length !== 0) {
            const expectedString = JSON.stringify(this.expectedResult);
            const resultString = JSON.stringify(actualResult);
            const differenceString = JSON.stringify(difference);

            return `Expected: ${expectedString} \nResult: ${resultString} \nDifference" ${differenceString}`;
        } else {
            return '';
        }
    }
}

export class TestResult {
    response_code: number;
    assessment: TestResultAssesment;
    description: string;

    constructor(response_code: number, assessment: TestResultAssesment, description: string) {
        this.response_code = response_code;
        this.assessment = assessment;
        this.description = description;
    }
}

export class TestCase {
    state: DB_STATE;
    testCondition: TestCondition;
    expectedResult: TestResult;

    constructor(state: DB_STATE, condition: TestCondition, result:  TestResult) {
        this.state = state;
        this.testCondition = condition;
        this.expectedResult = result;
    }

    GetDescription(): string {
        return 'With ' + this.testCondition.description + ', respond with ' + this.expectedResult.description;
    }
}
