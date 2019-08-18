// rest
import { NextFunction, Request, Response } from 'express';

import { Statement as StatementFacade } from '../facade/statement';

export class Statement {
    private sf = new StatementFacade();

    async many(request: Request, response: Response, next: NextFunction) {
        this.sf
            .getList(request.query.limit, request.query.after_id)
            .then((value) => {
                response.status(200).json(value);
            })
            .catch((error) => {
                response.status(400).send(error);
            });
    }

    async one(request: Request, response: Response, next: NextFunction) {
        this.sf
            .getOne(request.params.id)
            .then((value) => {
                response.status(200).json(value);
            })
            .catch((error) => {
                response.status(400).send(error);
            });
    }

	/*
    async tree(request: Request, response: Response, next: NextFunction) {
        return this.af.getList(request.query.limit, request.query.after_id);
    }
    */
}