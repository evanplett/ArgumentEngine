import {
  getRepository,
  MoreThan,
  Repository
} from 'typeorm';
import {
  ModelArgument,
  ReasoningMethod
} from '../entity/Argument';
import {
  ModelStatement
} from '../entity/Statement';
import {
  MyConnectionManager
} from '../manager';

import {
  Error
} from '../../Error';

export class ArgumentController {
  private argumentRepository: Repository = MyConnectionManager.GetCurrentConnection().getRepository(ModelArgument);

  // *********** CREATE ********** //
  createOne(conclusion: ModelStatement, reasoning_method: ReasoningMethod, premises: ModelStatement[]): Promise < ModelArgument > {
    console.debug('Controller::Argument::createOne');
    return this.argumentRepository.save(this.argumentRepository.create(
      {
        conclusion: conclusion,
        premises: premises,
        reasoning_method: reasoning_method
      }))
    .then(newArgument => {
      return this.one(newArgument.id);
    })
    .catch((error) => {
      return Promise.reject(new Error(400, `Unable to create Argument: ${error}`));
    });
  }

  // *********** READ ********** //
  many(afterId: number, maxCount: number): Promise < ModelArgument[] > {
    console.debug('Controller::Argument::many');
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

  one(id: number): Promise < ModelArgument > {
    console.debug('Controller::Argument::one');
    return this.argumentRepository.findOneOrFail(id, {
      relations: ['conclusion', 'premises']
    });
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