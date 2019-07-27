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
    return bma.getList(limit, after_id);
  }
  
  getFromId(id: number)
  {
    return bma.getFromId(id);
  }
  
  treeFromId(id: number, max_depth: number = 100)
  {
    return bma.treeFromId(id, max_depth);
  }
}
