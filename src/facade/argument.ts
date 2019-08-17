// Façade

import { ArgumentController } from "../business_model_typeorm/controller/ArgumentController";

import { Argument as ModelArgument } from "../business_model_typeorm/entity/Argument";

const DEFAULT_LIMIT: number = 100;
const DEFAULT_AFTER_ID: number = 0;
const DEFAULT_MAX_DEPTH: number = 6;

export class Argument {
  ac = new ArgumentController();

  async getList(limit?: number, after_id?: number): Promise<ModelArgument[]> {
    limit = limit && limit > 0 ? limit : DEFAULT_LIMIT;

    after_id = after_id && after_id >= 0 ? after_id : DEFAULT_AFTER_ID;

    this.ac
      .many(after_id, limit)
      .then(many => {
        if (many.length > 0) {
          return Promise.resolve(many);
        } else {
          return Promise.reject(`No Arguments after id ${after_id} found`);
        }
      })
      .catch(error => {
          return Promise.reject("Internal server error");
      });
  }

  async getOne(id: number): Promise<ModelArgument> {
    let one = await this.ac.one(id);

    if (one !== undefined) {
      return Promise.resolve(one);
    } else {
      return Promise.reject(`No Argument with id ${id} found`);
    }
  }

  /*
  getTree(id: number, max_depth?: number)
  {
     max_depth = max_depth && max_depth > 0 ? max_depth : DEFAULT_MAX_DEPTH;

     return this.ac.tree(id, max_depth);
  }*/
}
