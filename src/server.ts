import "reflect-metadata";
import * as express from "express";
import * as bodyParser from "body-parser";
import {Request, Response} from "express";
import { RestApp } from "./rest/app";
import { MyConnectionManager } from "./business_model_typeorm/manager";

import {ModelArgument, ReasoningMethod} from "./business_model_typeorm/entity/Argument";
import {ModelStatement} from "./business_model_typeorm/entity/Statement";

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


    // put some values in the database

    // many
    /*for(let i = 1; i < 100; i++) {
    let p1 = connection.manager.create( ModelStatement, { text: `Premis ${i}a` });
		    let p2 = connection.manager.create( ModelStatement, { text: `Premis ${i}b` });
		    let conc = connection.manager.create( ModelStatement, { text: `Conclusion ${i}`});

		    await connection.manager.save(p1);
		    await connection.manager.save(p2);
		    await connection.manager.save(conc);

		    let a1 = connection.manager.create( ModelArgument,
		       {
		          conclusion: conc,
		          premises: [p1, p2],
		          reasoningMethod: ReasoningMethod.Deduction
		       });

		    await connection.manager.save(a1);
    }*/

    // tree
    CreateNode(connection, 3);

}).catch(error => console.log(error));