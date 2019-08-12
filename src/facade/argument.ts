// Façade

import { ArgumentController } from "../business_model_typeorm/controller/ArgumentController";

export class Argument
{
  private const DEFAULT_LIMIT = 100;
  private const DEFAULT_STARTING_ID = 0;


  private ac = new ArgumentController();

  getList(limit?: number, after_id?: number) 
  {
    limit = limit && limit > 0 ? limit : DEFAULT_LIMIT;
    
    after_id = after_id && after_id >= 0 ? after_id : DEFAULT_STARTING_ID;
    
    return this.ac.many(after_id, limit);
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
