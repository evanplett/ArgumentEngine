import {createConnection, Connection } from "typeorm";
import {User} from "./entity/User";
import {Argument} from "./entity/Argument";
import {Statement} from "./entity/Statement";


export { createConnection as EnsureConnection } from "typeorm";

export function FillWithTestData(connection: Connection)
{
// clear the database each time
connection.manager.clear(User).then( result => { 	connection.manager.save(connection.manager.create(User, {
		        firstName: "Timber",
		        lastName: "Saw",
		        age: 27
		    })); connection.manager.save(connection.manager.create(User, {
		        firstName: "Phantom",
		        lastName: "Assassin",
		        age: 24
		    }));
		   
		    let p1 = connection.manager.create( Statement, { text: "Premis 1" });
		    let p2 = connection.manager.create( Statement, { text: "Premis 1" });
		    let conc = connection.manager.create( Statement, { text: "Conclusion" }); 
		    
		    connection.manager.save(p1);
		    connection.manager.save(p2);
		    connection.manager.save(conc);
		    
		    
		    let a1 = new Argument(conc, [p1, p2]);
		    
		    connection.manager.save(a1);
   });
}