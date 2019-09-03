import { BusinessModelManager } from "../business_model_typeorm/manager";

describe('This is a fake test', () => {

    beforeAll(() => {
        BusinessModelManager.EnsureConnection();
    });

    test('Check the fake function', () => {
        expect(4).toEqual(4);
        // return EnsureConnection().then(async connection => {
        //     expect(4).toEqual(4);
        // });
    });

    afterAll(() => {
        BusinessModelManager.CloseConnection();
    });
});