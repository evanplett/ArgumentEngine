import {ArgumentController} from "../business_model_typeorm/controller/ArgumentController";
import {StatementController} from "../business_model_typeorm/controller/StatementController";


import { Argument } from "./argument";
import { Statement } from "./statement";

const ArgumentRoutes =  [{
    method: "get",
    route: "/argument",
    controller: Argument,
    action: "many"
}, {
    method: "get",
    route: "/argument/:id",
    controller: Argument,
    action: "one"
}];/*, {
    method: "get",
    route: "/argument/:id/tree",
    controller: Argument,
    action: "tree"
}];, {
    method: "post",
    route: "/argument",
    controller: ArgumentController,
    action: "save"
}, {
    method: "delete",
    route: "/argument/:id",
    controller: ArgumentController,
    action: "remove"
}];*/


const StatementRoutes = [{
    method: "get",
    route: "/statement",
    controller: Statement,
    action: "many"
}, {
    method: "get",
    route: "/statement/:id",
    controller: Statement,
    action: "one"
}];/*, {
    method: "get",
    route: "/statement/:id/tree",
    controller: Statement,
    action: "tree"
}];, {
    method: "post",
    route: "/statement",
    controller: StatementController,
    action: "save"
}, {
    method: "delete",
    route: "/statement/:id",
    controller: StatementController,
    action: "remove"
}, {
    method: "get",
    route: "/argument/:id/tree",
    controller: Argument,
    action: "one"
}];*/

export const Routes = [
    ...ArgumentRoutes,
    ...StatementRoutes];



