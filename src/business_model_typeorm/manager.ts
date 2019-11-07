import {ConnectionManager, Connection, getConnectionOptions } from "typeorm";

export class MyConnectionManager {

static connMan: ConnectionManager = new ConnectionManager();

static currentConnectionName: string ="";

public static SetCurrentConnection(connectionName: string) : Promise<Connection>
{
  MyConnectionManager.currentConnectionName = connectionName;

 return getConnectionOptions(MyConnectionManager.currentConnectionName).then(
connectionOptions => {
  return MyConnectionManager.connMan.create(connectionOptions). connect();});
}

public static GetCurrentConnection() : Connection
{
   return MyConnectionManager.connMan.get(MyConnectionManager.currentConnectionName);
}


}