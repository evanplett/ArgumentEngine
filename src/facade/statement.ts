// Façade

import { StatementController } from '../business_model_typeorm/controller/StatementController';

import { Statement as ModelStatememt } from '../business_model_typeorm/entity/Statement';

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

    /*
              getTree(id: number, max_depth?: number)
              {
                 max_depth = max_depth && max_depth > 0 ? max_depth : DEFAULT_MAX_DEPTH;

                 return this.ac.tree(id, max_depth);
              }*/
}
