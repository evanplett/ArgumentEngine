import { getRepository, MoreThan } from 'typeorm';
import { NextFunction, Request, Response } from 'express';
import { ModelArgument, ReasoningMethod } from '../entity/Argument';
import { ModelStatement } from '../entity/Statement';

export class ArgumentController {
    private argumentRepository = getRepository(ModelArgument);

    // *********** CREATE ********** //
    async createOne(conclusion: ModelStatement, reasoningMethod: ReasoningMethod, premises: ModelStatement[]): Promise<ModelArgument> {

        console.log(`ArgController::createOne(${conclusion}, ${reasoningMethod}, ${premises})`);

        return this.argumentRepository.save(this.argumentRepository.create(
            {
                conclusion: conclusion,
                premises: premises,
                reasoningMethod: reasoningMethod
            }))
            .then(newArgument => {
                return this.one(newArgument.id);
            });

/*
        let newArgument = await this.argumentRepository.save(this.argumentRepository.create(
            {
                conclusion: conclusion,
                premises: premises,
                reasoningMethod: reasoningMethod
            }));



        return this.one(newArgument.id);*/
    }

    // *********** READ ********** //
    async many(afterId: number, maxCount: number): Promise<ModelArgument[]> {
        return this.argumentRepository.find({
            where: {
                id: MoreThan(afterId)
            },
            take: maxCount,
            order: {
                id: "ASC"
            },
            relations: ['conclusion', 'premises']
        });
    }

    async one(id: number): Promise<ModelArgument> {
        return this.argumentRepository.findOneOrFail(id, { relations: ['conclusion', 'premises'] });
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
