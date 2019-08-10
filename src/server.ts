import "reflect-metadata";
import * as express from "express";
import * as bodyParser from "body-parser";
import {Request, Response} from "express";
import { RestApp } from "./rest/app";
import { EnsureConnection, FillWithTestData } from "./business_model_typeorm/manager";

const PORT = process.env.PORT || "5000";

EnsureConnection({dropSchema: true}).then(async connection => {

    // put some values in the database
    FillWithTestData(connection);

    // create express app
    const app = express();
    app.use(bodyParser.json());

						// route to the rest app
    app.use('/rest', RestApp());

    // start express server
    app.listen(PORT);
    
    console.log("Express server has started on port " + PORT + ".");

}).catch(error => console.log(error));