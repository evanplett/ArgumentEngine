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
    errorText: string;
    Check(actualResult: object): boolean;
}

export class ConditionLength implements Condition {

    errorText: string;
    Check(actualResult: object): boolean {
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
                errors += condition.errorText + '\n';
            }
        });

        return errors;
    }
}
