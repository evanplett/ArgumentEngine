// Façade

import { ArgumentController } from "../business_model_typeorm/controller/ArgumentController";

const DEFAULT_LIMIT : number = 100;
const DEFAULT_AFTER_ID : number = 0;

export class Argument
{
  private ac = new ArgumentController();

  getList(limit?: number, after_id?: number) 
  {
    limit = limit && limit > 0 ? limit : DEFAULT_LIMIT;
    
    after_id = after_id && after_id >= 0 ? after_id : DEFAULT_AFTER_ID;
    
    return this.ac.many(after_id, limit);
  }
  
  getOne(id: number)
  {
    return this.ac.one(id);
  }
  
  
  /*
  getFromId(id: number)
  {
    return this.bma.getFromId(id);
  }
  
  treeFromId(id: number, max_depth: number = 100)
  {
    return this.bma.treeFromId(id, max_depth);
  }*/
}
