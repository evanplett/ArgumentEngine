import {Routes} from "./routes";
import * as express from "express";
import { MapRoutesOnApp } from "../routing_utils";

const app = express();

export class RestApp extends express.Application
{
  constructor() {
     super();
     MapRoutesOnApp(this, Routes);
  }
}

//MapRoutesOnApp(app, Routes);

/*
app.get('/', (req, res) => res.send('Hello World! - This is the argument engine'));*/


//export default app;