import { FacadeArgument } from './argument_facade';
import { EnsureConnection } from "../business_model_typeorm/manager";

describe('This is a simple test', () => {
    beforeAll(() => {
        expect(() => {
           return EnsureConnection()
                .then(connection => {
                    console.log("Connection Created");
                    this.af = new FacadeArgument();
                    return true;
                })
                .catch(error => {
                    return false;
                });
        }).toBe(true);
    });

    test('Check the sampleFunction function', () => {
        expect(this.af.getList()).toEqual('hellohello');
    });
});
