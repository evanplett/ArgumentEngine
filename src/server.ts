import "reflect-metadata";
import * as express from "express";
import {
  RestApp
} from "./rest/app";
import {
  MyConnectionManager
} from "./business_model_typeorm/manager";


MyConnectionManager.SetCurrentConnection("production").then(async connection => {
  // create express app
  const app = express();

  // route to the rest app
  app.use('/rest', RestApp());

  // start express server
  app.listen(PORT);

  console.log("Express server has started on port " + PORT + ".");
}).catch(error => console.log(error));