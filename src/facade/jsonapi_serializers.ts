import { Serializer } from 'jsonapi-serializer';

export const ArgumentSerializer: Serializer = new Serializer('Argument', {
    pluralizeType: false,
    attributes: ['conclusion', 'premises'],
    conclusion: {
        ref: 'id',
        attributes: ['text']
    },
    premises: {
        ref: 'id',
        attributes: ['text']
    },
    typeForAttribute: attribute => {
        switch (attribute) {
            case 'conclusion':
            case 'premises':
                return 'Statement';
            default:
                return undefined;
        }
    }
});
