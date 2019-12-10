import {
  getRepository,
  MoreThan,
  Repository
} from 'typeorm';
import {
  NextFunction,
  Request,
  Response
} from 'express';
import {
  ModelStatement
} from '../entity/Statement';
import {
  MyConnectionManager
} from '../manager';
import {
  logDatamodelTypeorm as logger
} from '../../log_config';


export class StatementController {

  private statementRepository: Repository < ModelStatement > = MyConnectionManager.GetCurrentConnection().getRepository(ModelStatement);

  // *********** CREATE ********** //
  createOne(text: string): Promise < ModelStatement > {
    return this.statementRepository.save(this.statementRepository.create( {
      text: text
    }))
    .then(newStatement => {
      return this.one(newStatement.id);
    });
  }

  // *********** READ ********** //
  many(afterId: number, maxCount: number): Promise < ModelStatement[] > {
    return this.statementRepository.find({
      where: {
        id: MoreThan(afterId)
      },
      take: maxCount,
      order: {
        id: 'ASC'
      },
      relations: ['supportingArguments', 'supportedArguments']
    });
  }

  one(id: number): Promise < ModelStatement > {
    return this.statementRepository.findOneOrFail(id, {
      relations: ['supportingArguments', 'supportedArguments']
    });
  }




  /*
        async remove(request: Request, response: Response, next: NextFunction) {
            let statementToRemove = await this.statementRepository.findOne(request.params.id);
            await this.statementRepository.remove(statementToRemove);
        }*/

}