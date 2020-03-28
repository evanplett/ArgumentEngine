import { diff, addedDiff, deletedDiff, updatedDiff, detailedDiff } from 'deep-object-diff';
import { conditionalExpression } from '@babel/types';

export interface TestResultAssesment {
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

interface Condition {
    ErrorText(): string;
    Check(actualResult: object): boolean;
}

export class ConditionLength implements Condition {
    expectedLength: number;
    actualLength: number;

    constructor(expectedLength: number) { this.expectedLength = expectedLength; }

    ErrorText(): string {
        return `Expected length ${this.expectedLength} does not equal actual length ${this.actualLength}`;
    }

    Check(actualResult: object): boolean {
        this.actualLength = Object.keys(actualResult).length;
        return this.expectedLength === this.actualLength;
    }
}

export class ConditionFunctionList implements Condition {
    functionList: Array<(result: object) => string>;
    errorsList: string[];

    constructor(functionList: Array<(result: object) => string>) {
        this.functionList = functionList;
        this.errorsList = [];
    }

    ErrorText(): string {
        return this.errorsList.join('\n');
    }

    Check(actualResult: object): boolean {
        this.functionList.forEach(func => {
            const error: string = func(actualResult);
            if (error.length > 0) {
                this.errorsList.push(error);
            }
        });

        return this.errorsList.length === 0;
    }
}

export class ConditionShowResult implements Condition {
    result: object;

    ErrorText(): string {
        return 'Result: \n' + JSON.stringify(this.result, null, 2);
    }

    Check(actualResult: object): boolean {
        this.result = actualResult;
        return false;
    }
}

export class ConditionComparison implements TestResultAssesment {
    conditions: Condition[];

    constructor(conditions: Condition[]) {
        this.conditions = conditions;
    }

    Compare(actualResult: object): string {
        let errors = '';

        this.conditions.forEach(condition => {
            if (!condition.Check(actualResult)) {
                errors += condition.ErrorText() + '\n';
            }
        });

        return errors;
    }
}
