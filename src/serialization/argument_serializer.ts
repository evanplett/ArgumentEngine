// look at https://www.npmjs.com/package/jsonapi-serializer

import {
    Serializer as JSONAPISerializer
} from 'jsonapi-serializer';

export const ArgumentSerializer = new JSONAPISerializer('argument', {
  attributes: ['conclusion', 'premises', 'reasoning_method'],
  conclusion: {
      
  }
});
