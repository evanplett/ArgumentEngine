import "reflect-metadata";
import * as express from "express";
import * as bodyParser from "body-parser";
import {Request, Response} from "express";
import { RestApp } from "./rest/app";
import { EnsureConnection } from "./business_model_typeorm/manager";

import {Argument} from "./business_model_typeorm/entity/Argument";
import {Statement} from "./business_model_typeorm/entity/Statement";

const PORT = process.env.PORT || "5000";

EnsureConnection().then(async connection => {
    // create express app
    const app = express();
    app.use(bodyParser.json());

						// route to the rest app
    app.use('/rest', RestApp());

    // start express server
    app.listen(PORT);
    
    console.log("Express server has started on port " + PORT + ".");
    
    
    
    for(let i = 0; i < 100; i++) {
    
    // put some values in the database
    let p1 = connection.manager.create( Statement, { text: `Premis ${i}a` });
		    let p2 = connection.manager.create( Statement, { text: `Premis ${i}b` });
		    let conc = connection.manager.create( Statement, { text: `Conclusion ${i}`}); 
		    
		    await connection.manager.save(p1);
		    await connection.manager.save(p2);
		    await connection.manager.save(conc);
		    
		    let a1 = connection.manager.create( Argument,
		       {
		          conclusion: conc,
		          premises: [p1, p2]
		       });
		  
		    await connection.manager.save(a1);
    }
}).catch(error => console.log(error));