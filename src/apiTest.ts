//apiTest.js
import {createConnection, getConnection, Entity, getRepository } from "typeorm";


import { MyConnectionManager } from "./business_model_typeorm/manager";

import {ModelArgument} from "./business_model_typeorm/entity/Argument";
import {ModelStatement} from "./business_model_typeorm/entity/Statement";

const request = require('supertest');
//const app = require('./rest/app'); //reference to you app.js file
import { RestApp } from "./rest/app"
const app = RestApp();

const connMan = MyConnectionManager();


//==================== user API test ====================

/**
 * Testing get all user endpoint
 */
describe('GET /argument', function () {

    beforeEach(() => {
        return connMan.SetCurrentConnection("testing");
    });

    afterEach(() => {
        let conn = connMan.GetCurrentConnection();
        return conn.close();
    })

    it('respond with json containing a list of all users', function (done) {
        request(app)
            .get('/argument')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400, done);
    });
});

