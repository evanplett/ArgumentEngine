// rest
import {NextFunction, Request, Response} from "express";


import { Argument as ArgumentFacade } from "../facade/argument";


export class Argument {

   private af = new ArgumentFacade();


   async many(request: Request, response: Response, next: NextFunction) {
   response.json(this.af.getList(request.query.limit, request.query.after_id));
   
        //return this.af.getList(request.query.limit, request.query.after_id);
    }
    
    async one(request: Request, response: Response, next: NextFunction) {
    let foundArg = await this.af.getOne(request.params.id);
    
    
response.status(200).json(foundArg);
        //return this.af.getOne(request.params.id);
    }
    
    /*
    async tree(request: Request, response: Response, next: NextFunction) {
        return this.af.getList(request.query.limit, request.query.after_id);
    }
    */
    
    
}