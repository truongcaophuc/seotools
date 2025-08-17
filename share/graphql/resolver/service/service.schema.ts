import union from 'lodash/union';
import { nullable, objectType, list, enumType } from 'nexus';

function getCustomerField(value: string) {
    const matchFieldReg = /\$\w*/i;
    return value.split(' ').filter((item) => matchFieldReg.test(item));
}

const ModelAi = enumType({
    name: 'ModelAi',
    members: ['Davinci', 'GPT', 'GPT4'],
});

export const ServiceSchema = objectType({
    name: 'Service',
    definition(t) {
        t.id('id');
        t.string('title');
        t.string('slug');
        t.list.string('customFieldIds');
        t.nullable.string('categoryId');
        t.field('category', {
            type: nullable('ServiceCategory'),
            resolve(parent, _, { prisma }) {
                if (!parent.categoryId) return null;
                return prisma.serviceCategory.findFirst({
                    where: { id: parent.categoryId },
                });
            },
        });
        t.nullable.string('leadingSentence');
        t.nullable.string('leadingLanguage');
        t.nullable.string('leadingStyleContent');
        t.nullable.string('systemMessage');
        t.nullable.field({
            name: 'model',
            type: ModelAi,
        });
        t.list.field('customFields', {
            type: 'CustomField',
            resolve(parent, _, { prisma }) {
                if (!parent.customFieldIds || parent.customFieldIds.length === 0) return [];

                return prisma.customFieldService.findMany({
                    where: {
                        id: {
                            in: parent.customFieldIds,
                        },
                    },
                });
            },
        });
        t.nullable.boolean('isDelete');
        t.nullable.string('description');
        t.date('createdAt');
    },
});
