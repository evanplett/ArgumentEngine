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
    
    
    // put some values in the database
    
    // many
    for(let i = 1; i < 100; i++) {
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
    
    
    
    // tree
    
    let t_p1a = connection.manager.create( Statement, { text: `Premis t1a` });
		    let t_p1b = connection.manager.create( Statement, { text: `Premis t1b` });
		    let t_conc1 = connection.manager.create( Statement, { text: `Conclusion t1`}); 
		    
		    await connection.manager.save(t_p1a);
		    await connection.manager.save(t_p1b);
		    await connection.manager.save(t_conc1);
		    
		    let t_a1 = connection.manager.create( Argument,
		       {
		          conclusion: t_conc1,
		          premises: [t_p1a, t_p1b]
		       });
		  
		    await connection.manager.save(t_a1);
    
    
    
    
    let t_p2a = connection.manager.create( Statement, { text: `Premis t2a` });
		    let t_p2b = connection.manager.create( Statement, { text: `Premis t2b` });
		    let t_conc2 = connection.manager.create( Statement, { text: `Conclusion t2`}); 
		    
		    await connection.manager.save(t_p2a);
		    await connection.manager.save(t_p2b);
		    await connection.manager.save(t_conc2);
		    
		    let t_a2 = connection.manager.create( Argument,
		       {
		          conclusion: t_conc2,
		          premises: [t_p2a, t_p2b]
		       });
		  
		    await connection.manager.save(t_a2);
    
    
    
    
    
    
		    let t_conc3 = connection.manager.create( Statement, { text: `Conclusion t3`}); 
		    
		 
		    await connection.manager.save(t_conc3);
		    
		    let t_a3 = connection.manager.create( Argument,
		       {
		          conclusion: t_conc3,
		          premises: [t_conc1, t_conc2]
		       });
		  
		    await connection.manager.save(t_a3);
    
}).catch(error => console.log(error));