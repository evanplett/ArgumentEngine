/*import app from './rest/app';

const PORT = process.env.PORT || '5000';
app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));*/

import "reflect-metadata";
import {createConnection} from "typeorm";
import * as express from "express";
import * as bodyParser from "body-parser";
import {Request, Response} from "express";
import {Routes} from "./routes";
import {User} from "./business_model_typeorm/entity/User";
import { MapRoutesOnApp } from "./routing_utils"

import { app as restApp } from "./rest/app"

const PORT = process.env.PORT || "5000";

createConnection().then(async connection => {

    // create express app
    const app = express();
    app.use(bodyParser.json());

    app.use('/rest', restApp);


    //MapRoutesOnApp(app, Routes);
/*
    // register express routes from defined application routes
    Routes.forEach(route => {
        (app as any)[route.method](route.route, (req: Request, res: Response, next: Function) => {
            const result = (new (route.controller as any))[route.action](req, res, next);
            if (result instanceof Promise) {
                result.then(result => result !== null && result !== undefined ? res.send(result) : undefined);

            } else if (result !== null && result !== undefined) {
                res.json(result);
            }
        });
    });
*/
    // setup express app here
    // ...

    // start express server
    app.listen(PORT);

    // insert new users for test
    await connection.manager.save(connection.manager.create(User, {
        firstName: "Timber",
        lastName: "Saw",
        age: 27
    }));
    await connection.manager.save(connection.manager.create(User, {
        firstName: "Phantom",
        lastName: "Assassin",
        age: 24
    }));

    console.log("Express server has started on port " + PORT + ".");

}).catch(error => console.log(error));