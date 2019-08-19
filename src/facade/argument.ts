// Façade

import { ArgumentController } from '../business_model_typeorm/controller/ArgumentController';
import { ModelArgument } from '../business_model_typeorm/entity/Argument';
import { FacadeStatement } from "./statement"

export class FacadeArgument {
					static readonly DEFAULT_LIMIT: number = 100;
					static readonly DEFAULT_AFTER_ID: number = 0;
					static readonly DEFAULT_MAX_DEPTH: number = 6;

    private ac = new ArgumentController();
    private fs: FacadeStatement;

    constructor(facadeStatement?: FacadeStatement) {
        this.fs = facadeStatement ? facadeStatement : new FacadeStatement(this);
    }

    async getList(limit?: number, after_id?: number): Promise<ModelArgument[]> {
        limit = limit && limit > 0 ? limit : FacadeArgument.DEFAULT_LIMIT;

        after_id = after_id && after_id >= 0 ? after_id : FacadeArgument.DEFAULT_AFTER_ID;

        let many = await this.ac.many(after_id, limit);

        if (many.length > 0) {
            return Promise.resolve(many);
        } else {
            return Promise.reject(`No Arguments after id ${after_id} found`);
        }
    }

    async getOne(id: number): Promise<ModelArgument> {
        let one = await this.ac.one(id);

        if (one !== undefined) {
            return Promise.resolve(one);
        } else {
            return Promise.reject(`No Argument with id ${id} found`);
        }
    }


    async getTree(id: number, max_depth?: number) {
        max_depth = max_depth && max_depth > 0 ? max_depth : FacadeArgument.DEFAULT_MAX_DEPTH;

        return this.getTreeNode(id, max_depth, 0);
    }

    async getTreeNode(id: number, max_depth: number, current_depth: number) {
        let arg = await this.getOne(id);

        return {
            argument_id: arg.id,
            premises: arg.premises.map(statement => this.fs.getTreeNode(statement.id, max_depth, current_depth + 1)),
            reasoning_method: arg.reasoningMethod
        }
    }
}
