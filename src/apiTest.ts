//apiTest.js
import {createConnection, getConnection, Entity, getRepository } from "typeorm";


import { EnsureConnection } from "./business_model_typeorm/manager";

import {ModelArgument} from "./business_model_typeorm/entity/Argument";
import {ModelStatement} from "./business_model_typeorm/entity/Statement";

const request = require('supertest');
//const app = require('./rest/app'); //reference to you app.js file
import { RestApp } from "./rest/app"
const app = RestApp()

//==================== user API test ====================

/**
 * Testing get all user endpoint
 */
describe('GET /argument', function () {

    beforeEach(() => {
        return EnsureConnection("testing");
    });

    afterEach(() => {
        let conn = getConnection("testing");
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

