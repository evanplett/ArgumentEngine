import {
  NextFunction,
  Request,
  Response
} from 'express';

import {
  FacadeArgument
} from '../facade/argument_facade';

import {
  logArgumentEngineBase as logger
} from '../log_config';

import {
    ArgumentSerializer
} from '../serialization/argument_serializer';

export class Argument {
  private af: FacadeArgument = new FacadeArgument();

  // *********** CREATE ********** //
  async create(request: Request, response: Response, next: NextFunction): Promise<void> {
    logger.trace('Rest::Argument::create(request.body: ' + JSON.stringify(request.body));
    this.af
    .createOne(request.body.conclusion, request.body.reasoning_method, request.body.premises)
    .then((value) => {
      response.status(200).json(value);
    })
    .catch((error) => {
      response.status(400).send(error);
    });
  }

  // *********** READ ********** //
  async many(request: Request, response: Response, next: NextFunction): Promise<void> {
    logger.trace('Rest::Argument::many');
    this.af
    .getList(request.query.limit, request.query.after_id)
    .then((value) => {
      response.status(200).json(value);
    })
    .catch((error) => {
      response.status(400).send(error);
    });
  }

  async one(request: Request, response: Response, next: NextFunction): Promise<void> {
    logger.trace('Rest::Argument::one');
    this.af
    .getOne(Number(request.params.id))
    .then((value) => {
      response.status(200).json(ArgumentSerializer.serialize(value));
    })
    .catch((error) => {
      response.status(400).send(error);
    });
  }


  async tree(request: Request, response: Response, next: NextFunction): Promise<void> {
    logger.trace('Rest::Argument::tree');
    this.af
    .getTree(Number(request.params.id), request.query.max_depth)
    .then((value) => {
      response.status(200).json(value);
    })
    .catch((error) => {
      response.status(400).send(error);
    });
  }
}
