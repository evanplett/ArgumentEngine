import {UserController} from "../business_model_typeorm/controller/UserController";
import {ArgumentController} from "../business_model_typeorm/controller/ArgumentController";
import {StatementController} from "../business_model_typeorm/controller/StatementController";


import { Argument } from "./argument";


export const Routes = [{
    method: "get",
    route: "/users",
    controller: UserController,
    action: "all"
}, {
    method: "get",
    route: "/users/:id",
    controller: UserController,
    action: "one"
}, {
    method: "post",
    route: "/users",
    controller: UserController,
    action: "save"
}, {
    method: "delete",
    route: "/users/:id",
    controller: UserController,
    action: "remove"
},



{
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
},



{
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
}


];