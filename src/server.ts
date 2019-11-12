import "reflect-metadata";
import * as express from "express";
import * as bodyParser from "body-parser";
import { RestApp } from "./rest/app";
import { MyConnectionManager } from "./business_model_typeorm/manager";

const PORT = process.env.PORT || "5000";

MyConnectionManager.SetCurrentConnection("production").then(async connection => {
    // create express app
    const app = express();
    app.use(bodyParser.json());

						// route to the rest app
    app.use('/rest', RestApp());

    // start express server
    app.listen(PORT);

    console.log("Express server has started on port " + PORT + ".");
}).catch(error => console.log(error));