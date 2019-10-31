import {ConnectionManager, Connection } from "typeorm";

const connectionManager = new ConnectionManager();

currentConnectionName: string;

export function SetCurrentConnection(connectionName: string) 
{
  currentConnectionName = connectionName;
  return connectionManager.create(currentConnectionName);
}

export function GetCurrentConnection() : Connection
{
   return connectionManager.get(currentConnectionName);
}