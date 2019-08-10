import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {Argument} from "../entity/Argument";

export class ArgumentController {

    private argumentRepository = getRepository(Argument);

    async all(request: Request, response: Response, next: NextFunction) {
        return this.argumentRepository.find({ relations: ["premises"] });
    }

    async one(request: Request, response: Response, next: NextFunction) {
        return this.argumentRepository.findOne(request.params.id, { relations: ["premises"] });
    }

    async save(request: Request, response: Response, next: NextFunction) {
        return this.argumentRepository.save(request.body);
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        let argumentToRemove = await this.argumentRepository.findOne(request.params.id);
        await this.argumentRepository.remove(argumentToRemove);
    }

}