import { getRepository, MoreThan } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { ModelStatement } from "../entity/Statement";

export class StatementController {

    private statementRepository = getRepository(ModelStatement);

    // *********** CREATE ********** //
    async createOne(text: string): Promise<ModelStatement> {
        let newStatement = await this.statementRepository.save( this.statementRepository.create( { text: text} ));
        return await this.statementRepository.findOne(newStatement.id,
        {
            relations: ['supportingArguments', 'supportedArguments']
        });
    }

    // *********** READ ********** //
    async many(afterId: number, maxCount: number): Promise<ModelStatement[]> {
        return await this.statementRepository.find({
            where: {
                id: MoreThan(afterId)
            },
            take: maxCount,
            order: {
                id: "ASC"
            },
            relations: ['supportingArguments', 'supportedArguments']
        });
    }


    async one(id: number): Promise<ModelStatement | undefined> {
        return await this.statementRepository.findOne(id, { relations: ['supportingArguments', 'supportedArguments'] });
    }













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