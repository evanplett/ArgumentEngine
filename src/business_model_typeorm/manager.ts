import {ConnectionManager, Connection, getConnectionOptions } from "typeorm";

const connectionManager = new ConnectionManager();

declare var currentConnectionName: string;

export function SetCurrentConnection(connectionName: string) : Promise<Connection>
{
  currentConnectionName = connectionName;

 return getConnectionOptions(currentConnectionName).then(
connectionOptions => {
  return connectionManager.create(connectionOptions). connect();});
}

export function GetCurrentConnection() : Connection
{
   return connectionManager.get(currentConnectionName);
}