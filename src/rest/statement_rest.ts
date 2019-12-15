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
    this.sf
    .createOne(request.body.text)
    .then((value) => {
      response.status(200).json(value);
    })
    .catch((error) => {
      response.status(400).send(error);
    });
  }

  // *********** READ ********** //
  async many(request: Request, response: Response, next: NextFunction): Promise<void> {
    this.sf
    .getList(request.query.limit, request.query.after_id)
    .then((value) => {
      response.status(200).json(value);
    })
    .catch((error) => {
      response.status(400).send(error);
    });
  }

  async one(request: Request, response: Response, next: NextFunction): Promise<void> {
    this.sf
    .getOne(Number(request.params.id))
    .then((value) => {
      response.status(200).json(value);
    })
    .catch((error) => {
      response.status(400).send(error);
    });
  }


  async tree(request: Request, response: Response, next: NextFunction): Promise<void> {
    this.sf
    .getTree(Number(request.params.id), request.query.max_depth)
    .then((value) => {
      response.status(200).json(value);
    })
    .catch((error) => {
      response.status(400).send(error);
    });
  }
}
