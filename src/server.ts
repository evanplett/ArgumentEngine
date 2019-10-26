import "reflect-metadata";
import * as express from "express";
import * as bodyParser from "body-parser";
import {Request, Response} from "express";
import { RestApp } from "./rest/app";
import { EnsureConnection } from "./business_model_typeorm/manager";

import {ModelArgument, ReasoningMethod} from "./business_model_typeorm/entity/Argument";
import {ModelStatement} from "./business_model_typeorm/entity/Statement";

const PORT = process.env.PORT || "5000";

/*
async function CreateNode(connection: any, max_level: number, current_level: number = 0,  path: string = ""): Promise<ModelStatement> {
   let conclusion = connection.manager.create( ModelStatement, { text: "Conclusion " + path});

    await connection.manager.save(conclusion);

    if (current_level < max_level)
    {
       let leftNode = await CreateNode(connection, max_level, current_level + 1, path + "L");

       let rightNode = await CreateNode(connection, max_level, current_level + 1, path + "R");

       let argument = connection.manager.create( ModelArgument,
		       {
		          conclusion: conclusion,
		          premises: [leftNode, rightNode],
		          reasoningMethod: ReasoningMethod.Induction
		       });

		    await connection.manager.save(argument);
    }


    return new Promise<ModelStatement>((resolve) => {
        resolve(conclusion);
        });


    //return conclusion;
}*/


EnsureConnection().then(async connection => {
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
    //CreateNode(connection, 6);

}).catch(error => console.log(error));