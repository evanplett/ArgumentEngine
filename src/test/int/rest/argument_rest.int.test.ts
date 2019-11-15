//apiTest.js
import {createConnection, getConnection, Entity, getRepository } from "typeorm";


import { MyConnectionManager } from "../../../business_model_typeorm/manager";

import {ModelArgument} from "../../../business_model_typeorm/entity/Argument";
import {ModelStatement} from "../../../business_model_typeorm/entity/Statement";

const request = require('supertest');

import { RestApp } from "../../../rest/app"
const app = RestApp();



describe('With an empty database', function () {

    beforeEach(() => {
        return MyConnectionManager.SetCurrentConnection("testing");
    });

    afterEach(() => {
        let conn = MyConnectionManager.GetCurrentConnection();
        return conn.close();
    });


   describe ('GET Argument', function () {

    it('with no parameters, respond with code 400 and error message', function () {
        return request(app)
            .get('/argument')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400, {
              errorCode: 400,
              errorDetail: "No Arguments after id 0 found"
      });
    });


it('with after_id = 10, respond with code 400 and error message', function () {
        return request(app)
            .get('/argument?after_id=10')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400, {
              errorCode: 400,
              errorDetail: "No Arguments after id 10 found"
      });
    });



    });



});







/*



*/


/*async function CreateNode(connection: any, max_level: number, current_level: number = 0,  path: string = ""): Promise<ModelStatement> {
   let conclusion = connection.manager.create( ModelStatement, { text: "Conclusion " + path});

    await connection.manager.save(conclusion);

    if (current_level < max_level)
    {
       let leftNode = await CreateNode(connection, max_level, current_level + 1, path + "L");

       let rightNode = await CreateNode(connection, max_level, current_level + 1, path + "R");

       let argument = connection.manager.create( ModelArgument,
		       {
		          conclusion: conclusion,
		          premises: [leftNode, rightNode],
		          reasoningMethod: ReasoningMethod.Induction
		       });

		    await connection.manager.save(argument);
    }


    return new Promise<ModelStatement>((resolve) => {
        resolve(conclusion);
        });
}*/
