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
    this.af.getOne(request.params.id)
    .then(value => {
        response.status(200).json(value);
       })
    .catch(error => {
       response.status(400).send(error);
    });
    }
    
    /*
    async tree(request: Request, response: Response, next: NextFunction) {
        return this.af.getList(request.query.limit, request.query.after_id);
    }
    */
    
    
}