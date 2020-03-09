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
    state: DB_STATE;
    request: APIRequest;
    query: object;

    constructor(state: DB_STATE, request_type: REQUEST_TYPE, request_url: string, query: object) {
        this.state = state;
        this.request = new APIRequest(request_type, request_url);
        this.query = query;
    }
}

export class TestResult {
    response_code: number;
    response_object: object;

    constructor(response_code: number, response_object: object) {
        this.response_code = response_code;
        this.response_object = response_object;
    }
}

export class TestCase {
    description: string;
    testCondition: TestCondition;
    expectedResult: TestResult;

    constructor(description: string,
                state: DB_STATE,
                request_type: REQUEST_TYPE,
                request_url: string,
                query: object,
                response_code: number,
                response_object: object) {
        this.description = description;
        this.testCondition = new TestCondition(state, request_type, request_url, query);
        this.expectedResult = new TestResult(response_code, response_object);
    }
}
