import {getRepository, MoreThan} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {Argument} from "../entity/Argument";

export class ArgumentController {

    private argumentRepository = getRepository(Argument);

    async many(afterId: number, maxCount: number) {
        
     return this.argumentRepository.find({ 
       where: {
          id: MoreThan(afterId)
       },
       take: maxCount,
       relations: ["conclusion", "premises"]});
    }
    
    

     async one(id: number) 
     {
        return this.argumentRepository.findOne(id, { relations: ["conclusion", "premises"] });
    }
    
    
    
    
    
    /* Tree should be part of statement
     async tree(id: number, maxDepth: number) {


}



async function createTreeNode(id: number, max_depth: number, currentDepth: number): Promise<Statement> {


    let argument = wait this.argumentRepository.findOne(id, { relations: ["conclusion", "premises"] });
    
    for(let i = 0; i < argument.premises.length; i++) {
       argument.premises[i] = await create 
    }
    
    for each premis, replace with createTreeNode

}
*/



/*    async all(request: Request, response: Response, next: NextFunction) {
        return this.argumentRepository.find({ relations: ["conclusion", "premises"]});
    }

    async one(request: Request, response: Response, next: NextFunction) {
        return this.argumentRepository.findOne(request.params.id, { relations: ["conclusion", "premises"] });
    }

    async save(request: Request, response: Response, next: NextFunction) {
        return this.argumentRepository.save(request.body);
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        let argumentToRemove = await this.argumentRepository.findOne(request.params.id);
        await this.argumentRepository.remove(argumentToRemove);
    }*/

}