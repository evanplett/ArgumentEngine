import { Serializer } from 'jsonapi-serializer';

export const ArgumentSerializer: Serializer = new Serializer('Argument', {
            pluralizeType: false,
            attributes: ['conclusion'],
            conclusion: {
                ref: 'id',
                attributes: ['text']
            },
            typeForAttribute: attribute => {
                if (attribute === 'conclusion')
                    return 'Statement';
                else
                    return undefined;
            }
        });
