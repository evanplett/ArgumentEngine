import { EnsureConnection } from "../business_model_typeorm/manager";

describe('This is a fake test', () => {


    test('Check the fake function', () => {
        return EnsureConnection().then(async connection => {
            expect(4).toEqual(4);
        });
    });
});