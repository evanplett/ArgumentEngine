// look at https://www.npmjs.com/package/jsonapi-serializer

const JSONAPISerializer = require('jsonapi-serializer').Serializer;
 
export const ArgumentSerializer = new JSONAPISerializer('argument', {
  attributes: ['conclusion', 'premises', 'reasoning_method']
});