// rest
import {NextFunction, Request, Response} from "express";


import { Argument as ArgumentFacade } from "../facade/argument";


export class Argument {

   private af = new ArgumentFacade();


   async all(request: Request, response: Response, next: NextFunction) {
        return this.af.getList(request.body.limit, request.body.after_id)
    }
    
    
    
}