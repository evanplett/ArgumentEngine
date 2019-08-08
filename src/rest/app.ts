import {Routes} from "./routes";
import * as express from "express";
import { MapRoutesOnApp } from "../routing_utils";

export function RestApp() {
     const app = express();
     MapRoutesOnApp(app, Routes);
     return app;
}

//MapRoutesOnApp(app, Routes);

/*
app.get('/', (req, res) => res.send('Hello World! - This is the argument engine'));*/


//export default app;