// Façade

import { Argument as Argument_bm } from "../business_model/argument";

export class Argument
{
  private bma : Argument_bm;

  constructor() 
  {
    this.bma = new Argument_bm();
  }
  
  getList(limit: number = 100, after_id: number = 0) 
  {
    return this.bma.getList(limit, after_id);
  }
  
  getFromId(id: number)
  {
    return this.bma.getFromId(id);
  }
  
  treeFromId(id: number, max_depth: number = 100)
  {
    return this.bma.treeFromId(id, max_depth);
  }
}
