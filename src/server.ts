import "reflect-metadata";
import * as express from "express";
import * as bodyParser from "body-parser";
import { Request, Response } from "express";
import { RestApp } from "./rest/app";
import { EnsureConnection } from "./business_model_typeorm/manager";

import { ModelArgument, ReasoningMethod } from "./business_model_typeorm/entity/Argument";
import { ModelStatement } from "./business_model_typeorm/entity/Statement";


export class Server {
    static readonly PORT = process.env.PORT || "5000";

    static Start() {
        EnsureConnection().then(async connection => {
            // create express app
            const app = express();
            app.use(bodyParser.json());

            // route to the rest app
            app.use('/rest', RestApp());

            // start express server
            app.listen(this.PORT);

            console.log("Express server has started on port " + this.PORT + ".");
        }).catch(error => console.log(error));
    }
}

Server.Start();