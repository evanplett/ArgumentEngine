import {ConnectionManager, Connection, getConnectionOptions } from "typeorm";

export class MyConnectionManager extends ConnectionManager {

private currentConnectionName ="";

public SetCurrentConnection(connectionName: string) : Promise<Connection>
{
  this.currentConnectionName = connectionName;

 return getConnectionOptions(currentConnectionName).then(
connectionOptions => {
  return this.create(connectionOptions). connect();});
}

public GetCurrentConnection() : Connection
{
   return this.get(global.currentConnectionName);
}


}