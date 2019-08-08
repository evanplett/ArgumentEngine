import {Connection} from "typeorm";
import {User} from "./business_model_typeorm/entity/User";


export function FillDatabase(connection: typeorm.Connection)
{
// clear the database each time
await connection.manager.clear(User)

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
    }));

}