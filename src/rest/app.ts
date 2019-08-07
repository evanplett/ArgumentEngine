import {Routes} from "./routes";
import express from 'express';
import { MapRoutesOnApp } from "../routing_utils";

const app = express();


MapRoutesOnApp(app, Routes);

/*
app.get('/', (req, res) => res.send('Hello World! - This is the argument engine'));*/


export default app;