import {ConnectionManager, Connection } from "typeorm";

const connectionManager = new ConnectionManager();

declare var currentConnectionName: string;

export function SetCurrentConnection(connectionName: string) 
{
  currentConnectionName = connectionName;
  return connectionManager.create(currentConnectionName);
}

export function GetCurrentConnection() : Connection
{
   return connectionManager.get(currentConnectionName);
}