import {ConnectionManager, Connection, getConnectionOptions } from "typeorm";


#TODO: Maybe inherit from typeorm ConnectionManager
export abstract class MyConnectionManager {


private const connectionManager = new ConnectionManager();

private static currentConnectionName ="";

public static SetCurrentConnection(connectionName: string) : Promise<Connection>
{
  global.currentConnectionName = connectionName;

 return getConnectionOptions(currentConnectionName).then(
connectionOptions => {
  return connectionManager.create(connectionOptions). connect();});
}

public static GetCurrentConnection() : Connection
{
   return connectionManager.get(global.currentConnectionName);
}


}