// Façade

import { StatementController } from '../business_model_typeorm/controller/StatementController';
import { Statement as ModelStatememt } from '../business_model_typeorm/entity/Statement';
import { Argument as FacadeArgument } from "./argument"

const DEFAULT_LIMIT: number = 100;
const DEFAULT_AFTER_ID: number = 0;
const DEFAULT_MAX_DEPTH: number = 6;

export class Statement {
    sc = new StatementController();

    async getList(limit?: number, after_id?: number): Promise<ModelStatememt[]> {
        limit = limit && limit > 0 ? limit : DEFAULT_LIMIT;

        after_id = after_id && after_id >= 0 ? after_id : DEFAULT_AFTER_ID;

        let many = await this.sc.many(after_id, limit);

        if (many.length > 0) {
            return Promise.resolve(many);
        } else {
            return Promise.reject(`No Statements after id ${after_id} found`);
        }
    }

    async getOne(id: number): Promise<ModelStatememt> {
        let one = await this.sc.one(id);

        if (one !== undefined) {
            return Promise.resolve(one);
        } else {
            return Promise.reject(`No Statement with id ${id} found`);
        }
    }


    async getTree(id: number, max_depth?: number) {
        max_depth = max_depth && max_depth > 0 ? max_depth : DEFAULT_MAX_DEPTH;

        return this.getTreeNode(id, max_depth, 0);
    }

    async getTreeNode(id: number, max_depth: number, current_depth: number) {
        let statement = await this.getOne(id);

        return {
            statement_id: statement.id,
            text: statement.text,
            supportingArguments: statement.supportedArguments.map(argument => FacadeArgument.getTreeNode(argument.id, max_depth, current_depth + 1))
        }
    }
}
