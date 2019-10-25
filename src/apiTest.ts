//apiTest.js
const request = require('supertest');
//const app = require('./rest/app'); //reference to you app.js file
import { RestApp } from "./rest/app"
const app = RestApp()

//==================== user API test ====================

/**
 * Testing get all user endpoint
 */
describe('GET /argument', function () {
    it('respond with json containing a list of all users', function (done) {
        request(app)
            .get('/argument')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
});

