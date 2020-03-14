export enum DB_STATE {
    EMPTY_DB,
    FULL_DB
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

export class TestResult {
    response_code: number;
    response_object: object;
    description: string;

    constructor(response_code: number, response_object: object, description: string) {
        this.response_code = response_code;
        this.response_object = response_object;
        this.description = description;
    }
}

export class TestCase {
    state: DB_STATE;
    testCondition: TestCondition;
    expectedResult: TestResult;

    constructor(conditionDescription: string,
                state: DB_STATE,
                request_type: REQUEST_TYPE,
                request_url: string,
                data: object,
                response_code: number,
                response_object: object,
                resultDescription: string) {
        this.state = state;
        this.testCondition = new TestCondition(request_type, request_url, data, conditionDescription);
        this.expectedResult = new TestResult(response_code, response_object, resultDescription);
    }

    GetDescription(): string {
        return 'With ' + this.testCondition.description + ", respond with " + this.expectedResult.description;
    }
}
