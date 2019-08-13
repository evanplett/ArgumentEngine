import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {Statement} from "../entity/Statement";

export class StatementController {

    private statementRepository = getRepository(Statement);
/*
    async all(request: Request, response: Response, next: NextFunction) {
        return this.statementRepository.find();
    }

    async one(request: Request, response: Response, next: NextFunction) {
        return this.statementRepository.findOne(request.params.id);
    }

    async save(request: Request, response: Response, next: NextFunction) {
        return this.statementRepository.save(request.body);
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        let statementToRemove = await this.statementRepository.findOne(request.params.id);
        await this.statementRepository.remove(statementToRemove);
    }*/

}