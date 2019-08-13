import {ArgumentController} from "../business_model_typeorm/controller/ArgumentController";
import {StatementController} from "../business_model_typeorm/controller/StatementController";


import { Argument } from "./argument";

const ArgumentRoutes =  [{
    method: "get",
    route: "/argument",
    controller: Argument,
    action: "all"
}, {
    method: "get",
    route: "/argument/:id",
    controller: ArgumentController,
    action: "one"
}, {
    method: "post",
    route: "/argument",
    controller: ArgumentController,
    action: "save"
}, {
    method: "delete",
    route: "/argument/:id",
    controller: ArgumentController,
    action: "remove"
}];


const StatementRoutes = [{
    method: "get",
    route: "/statement",
    controller: StatementController,
    action: "all"
}, {
    method: "get",
    route: "/statement/:id",
    controller: StatementController,
    action: "one"
}, {
    method: "post",
    route: "/statement",
    controller: StatementController,
    action: "save"
}, {
    method: "delete",
    route: "/statement/:id",
    controller: StatementController,
    action: "remove"
}];

export const Routes = [
    ...ArgumentRoutes];//,
    //...StatementRofutes];



