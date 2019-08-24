// rest
import { NextFunction, Request, Response } from 'express';

import { FacadeStatement } from '../facade/statement';

export class Statement {
    private sf = new FacadeStatement();

    // *********** CREATE ********** //
    async create(request: Request, response: Response, next: NextFunction) {
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


    async tree(request: Request, response: Response, next: NextFunction) {
        this.sf
        .getTree(request.params.id, request.query.max_depth)
        .then((value) =>{
            response.status(200).json(value);
        })
        .catch((error) => {
                response.status(400).send(error);
         });
    }
}
