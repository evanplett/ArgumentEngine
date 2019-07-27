// Business Model

export class Argument
{
  constructor() {}
  
  getList(limit: number, after_id: number) 
  {
    return "list with limit " + limit + " and after id " + after_id;
  }
  
  getFromId(id: number)
  {
    return "Argument from id " + id;
  }
  
  treeFromId(id: number, max_depth: number)
  {
    return "Tree from id " + id + " with a max depth of " + max_depth;
  }
}
