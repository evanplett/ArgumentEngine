// Façade

import { ArgumentController } from "../business_model_typeorm/controller/ArgumentController";

export class Argument
{
  private ac = new ArgumentController();

  getList(limit: number = 100, after_id: number = 0) 
  {
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
