import "reflect-metadata";
import * as express from "express";
import * as bodyParser from "body-parser";
import {Request, Response} from "express";
import { RestApp } from "./rest/app";
import { EnsureConnection, FillWithTestData } from "./business_model_typeorm/manager";

const PORT = process.env.PORT || "5000";

EnsureConnection().then(async connection => {

    // put some values in the database
    //FillWithTestData(connection);


let p1 = connection.manager.create( Statement, { text: "Premis 1" });
		    let p2 = connection.manager.create( Statement, { text: "Premis 1" });
		    let conc = connection.manager.create( Statement, { text: "Conclusion" }); 
		    
		    await connection.manager.save(p1);
		    await connection.manager.save(p2);
		    await connection.manager.save(conc);
		    
		    
		    let a1 = connection.manager.create( Argument,
		       {
		          conclusion: conc//,
		          premises: [p1, p2]
		       });
		  
		    await connection.manager.save(a1);









    // create express app
    const app = express();
    app.use(bodyParser.json());

						// route to the rest app
    app.use('/rest', RestApp());

    // start express server
    app.listen(PORT);
    
    console.log("Express server has started on port " + PORT + ".");

}).catch(error => console.log(error));