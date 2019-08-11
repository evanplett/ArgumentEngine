import {createConnection, Connection } from "typeorm";
import {Argument} from "./entity/Argument";
import {Statement} from "./entity/Statement";


export { createConnection as EnsureConnection } from "typeorm";

export function FillWithTestData(connection: Connection)
{
		    let p1 = connection.manager.create( Statement, { text: "Premis 1" });
		    let p2 = connection.manager.create( Statement, { text: "Premis 1" });
		    let conc = connection.manager.create( Statement, { text: "Conclusion" }); 
		    
		    connection.manager.save(p1);
		    connection.manager.save(p2);
		    connection.manager.save(conc);
		    
		    
		    let a1 = connection.manager.create( Argument,
		       {
		          conclusion: conc//,
		          //premises: [p1, p2]
		       });
		  
		    connection.manager.save(a1);
}