import "reflect-metadata";
import {createConnection} from "typeorm";
import * as express from "express";
import * as bodyParser from "body-parser";
import {Request, Response} from "express";
import {Routes} from "./routes";
import { MapRoutesOnApp } from "./routing_utils";
import { RestApp } from "./rest/app";

import { FillDatabase } from "./dev_database_filler";

const PORT = process.env.PORT || "5000";

createConnection().then(async connection => {

    // create express app
    const app = express();
    app.use(bodyParser.json());

    app.use('/rest', RestApp());

    // start express server
    app.listen(PORT);
    
    FillDatabase(connection);
    
/*
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
    }));*/

    console.log("Express server has started on port " + PORT + ".");

}).catch(error => console.log(error));