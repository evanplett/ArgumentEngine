import { FacadeArgument } from './argument_facade';
import { EnsureConnection } from "../business_model_typeorm/manager";

describe('This is a simple test', () => {
	beforeAll(async () => {
        await EnsureConnection();
        console.log("Connection Created");
        this.af = new FacadeArgument();
    });

	test('Check the sampleFunction function', () => {
		expect(this.af.getList()).toEqual('hellohello');
	});
});
