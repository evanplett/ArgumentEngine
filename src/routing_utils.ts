import * as express from 'express';
import {Request, Response} from 'express';


export function MapRoutesOnApp(app: express.Application, routes: any  ): void {
    // register express routes from defined application routes
    routes.forEach(route => {
        (app as any)[route.method](route.route, (req: Request, res: Response, next: Function) => {
            const result = (new (route.controller as any))[route.action](req, res, next);
            if (result instanceof Promise) {
                result.then(result1 => result1 !== null && result1 !== undefined ? res.send(result1) : undefined);
            } else if (result !== null && result !== undefined) {
                res.json(result);
            }
        });
    });
}
