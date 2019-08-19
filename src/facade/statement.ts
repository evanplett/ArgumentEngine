// Façade

import { StatementController } from '../business_model_typeorm/controller/StatementController';
import { ModelStatement } from '../business_model_typeorm/entity/Statement';
import { FacadeArgument } from "./argument"


export class FacadeStatement {
					static readonly DEFAULT_LIMIT: number = 100;
					static readonly DEFAULT_AFTER_ID: number = 0;
					static readonly DEFAULT_MAX_DEPTH: number = 6;


    private sc = new StatementController();
    private fa: FacadeArgument;

    constructor(facadeArgument?: FacadeArgument) {
        this.fa = facadeArgument ? facadeArgument : new FacadeArgument(this);
    }

    async getList(limit?: number, after_id?: number): Promise<ModelStatement[]> {
        limit = limit && limit > 0 ? limit : FacadeStatement.DEFAULT_LIMIT;

        after_id = after_id && after_id >= 0 ? after_id : FacadeStatement.DEFAULT_AFTER_ID;

        let many = await this.sc.many(after_id, limit);

        if (many.length > 0) {
            return Promise.resolve(many);
        } else {
            return Promise.reject(`No Statements after id ${after_id} found`);
        }
    }

    async getOne(id: number): Promise<ModelStatement> {
        let one = await this.sc.one(id);

        if (one !== undefined) {
            return Promise.resolve(one);
        } else {
            return Promise.reject(`No Statement with id ${id} found`);
        }
    }


    async getTree(id: number, max_depth?: number) {
        max_depth = max_depth && max_depth > 0 ? max_depth : FacadeStatement.DEFAULT_MAX_DEPTH;

        return this.getTreeNode(id, max_depth, 0);
    }

    async getTreeNode(id: number, max_depth: number, current_depth: number) {
        let statement = await this.getOne(id);

        console.log(`Getting tree for statement ${id} with ${statement.supportingArguments.length} supporting arguments`);

        let children;

        if (current_depth < max_depth)
        {
            let results = statement.supportingArguments.map(async (argument) => this.fa.getTreeNode(argument.id, max_depth, current_depth + 1));

            Promise.all(results)
.then((completed) => children = completed);
        }

        return {
            statement_id: statement.id,
            text: statement.text,
            supportingArguments: children
        }
    }
}
