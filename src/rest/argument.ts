// rest

import { Argument as ArgumentFacade } from "../facade/Argument";


export class Argument {

   private af = ArgumentFacade();


   async all(request: Request, response: Response, next: NextFunction) {
        return af.getList()
    }
    
    
    
}