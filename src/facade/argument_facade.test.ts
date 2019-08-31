// import { FacadeArgument } from './argument_facade';
// import { EnsureConnection } from "../business_model_typeorm/manager";

// function Initialize(): boolean {
//     return EnsureConnection()
//         .then(connection => {
//             console.log("Connection Created");
//             this.af = new FacadeArgument();
//             return true;
//         })
//         .catch(error => {
//             return false;
//         });
// }

// describe('This is a simple test', () => {
//     beforeAll(() => {
//         expect(Initialize()).toBe(true);
//     });

//     test('Check the sampleFunction function', () => {
//         expect(this.af.getList()).toEqual('hellohello');
//     });
// });
