import {createConnection} from "typeorm";

export EnsureConnection = createConnection;

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
    });
}