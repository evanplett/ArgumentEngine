// rest
import {
  NextFunction,
  Request,
  Response
} from 'express';

import {
  FacadeStatement
} from '../facade/statement_facade';

import {
  logApiRest as logger
} from '../log_config';


export class Statement {
  private sf: FacadeStatement = new FacadeStatement();

  // *********** CREATE ********** //
  async create(request: Request, response: Response, next: NextFunction): Promise<void> {
    logger.trace('Statement::create(request.body: ' + JSON.stringify(request.body) + ')');
    this.sf
    .createOne(request.body.text)
    .then((value) => {
      logger.trace('Statement::create - Returning value \'' + JSON.stringify(value) + '\'');
      response.status(200).json(value);
    })
    .catch((error) => {
      logger.trace('Statement::create - Returning error \'' + JSON.stringify(error) + '\'');
      response.status(400).send(error);
    });
  }

  // *********** READ ********** //
  async many(request: Request, response: Response, next: NextFunction): Promise<void> {
    logger.trace('Statement::many(request.body: ' + JSON.stringify(request.body) + ')');
    this.sf
    .getList(request.query.limit, request.query.after_id)
    .then((value) => {
      logger.trace('Statement::many - Returning value \'' + JSON.stringify(value) + '\'');
      response.status(200).json(value);
    })
    .catch((error) => {
      logger.trace('Statement::many - Returning error \'' + JSON.stringify(error) + '\'');
      response.status(400).send(error);
    });
  }

  async one(request: Request, response: Response, next: NextFunction): Promise<void> {
    logger.trace('Statement::one(request.body: ' + JSON.stringify(request.body) + ')');
    this.sf
    .getOne(Number(request.params.id))
    .then((value) => {
      logger.trace('Statement::one - Returning value \'' + JSON.stringify(value) + '\'');
      response.status(200).json(value);
    })
    .catch((error) => {
      logger.trace('Statement::one - Returning error \'' + JSON.stringify(error) + '\'');
      response.status(400).send(error);
    });
  }


  async tree(request: Request, response: Response, next: NextFunction): Promise<void> {
    logger.trace('Statement::tree(request.body: ' + JSON.stringify(request.body) + ')');
    this.sf
    .getTree(Number(request.params.id), request.query.max_depth)
    .then((value) => {
      logger.trace('Statement::tree - Returning value \'' + JSON.stringify(value) + '\'');
      response.status(200).json(value);
    })
    .catch((error) => {
      logger.trace('Statement::tree - Returning error \'' + JSON.stringify(error) + '\'');
      response.status(400).send(error);
    });
  }
}
