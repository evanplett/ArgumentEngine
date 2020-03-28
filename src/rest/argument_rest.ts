import {
  NextFunction,
  Request,
  Response
} from 'express';

import {
  FacadeArgument
} from '../facade/argument_facade';

import {
  logApiRest as logger
} from '../log_config';

import {
    ArgumentSerializer
} from '../serialization/argument_serializer';

export class Argument {
  private af: FacadeArgument = new FacadeArgument();

  // *********** CREATE ********** //
  async create(request: Request, response: Response, next: NextFunction): Promise<void> {
    logger.trace('Argument::create(request.body: ' + JSON.stringify(request.body) + ')');
    this.af
    .createOne(request.body.conclusion, request.body.reasoning_method, request.body.premises)
    .then((value) => {
      logger.trace('Argument::create - Returning value \'' + JSON.stringify(value) + '\'');
      response.status(200).json(value);
    })
    .catch((error) => {
      logger.trace('Argument::create - Returning error \'' + JSON.stringify(error) + '\'');
      response.status(400).send(error);
    });
  }

  // *********** READ ********** //
  async many(request: Request, response: Response, next: NextFunction): Promise<void> {
    logger.trace('Argument::many(request.body: ' + JSON.stringify(request.body) + ')');
    this.af
    .getList(request.query.limit, request.query.after_id)
    .then((value) => {
      logger.trace('Argument::many - Returning value \'' + JSON.stringify(value) + '\'');
      response.status(200).json(value);
    })
    .catch((error) => {
      logger.trace('Argument::many - Returning error \'' + JSON.stringify(error) + '\'');
      response.status(400).send(error);
    });
  }

  async one(request: Request, response: Response, next: NextFunction): Promise<void> {
    logger.trace('Argument::one(request.body: ' + JSON.stringify(request.body) + ')');
    this.af
    .getOne(Number(request.params.id))
    .then((value) => {
      logger.trace('Argument::one - Returning value \'' + JSON.stringify(value) + '\'');
      response.status(200).json(ArgumentSerializer.serialize(value));
    })
    .catch((error) => {
      logger.trace('Argument::one - Returning error \'' + JSON.stringify(error) + '\'');
      response.status(400).send(error);
    });
  }


  async tree(request: Request, response: Response, next: NextFunction): Promise<void> {
    logger.trace('Argument::tree(request.body: ' + JSON.stringify(request.body) + ')');
    this.af
    .getTree(Number(request.params.id), request.query.max_depth)
    .then((value) => {
      logger.trace('Argument::tree - Returning value \'' + JSON.stringify(value) + '\'');
      response.status(200).json(value);
    })
    .catch((error) => {
      logger.trace('Argument::create - Returning error \'' + JSON.stringify(error) + '\'');
      response.status(400).send(error);
    });
  }
}
