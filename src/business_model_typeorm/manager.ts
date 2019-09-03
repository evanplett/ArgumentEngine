import { createConnection, Connection } from "typeorm";

export class BusinessModelManager {
    static connection: Connection;

    static async EnsureConnection() : Connection {
        if (!this.connection) {
            this.connection = await createConnection();
        }

        return this.connection;
    }

    static CloseConnection() {
        if (this.connection)
        {
            this.connection.close();
        }
    }
}

