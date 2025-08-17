import { enumType, objectType } from 'nexus';

const CustomFieldInputType = enumType({
    name: 'CustomFieldInputType',
    members: ['Input', 'Textarea', 'Language', 'StyleContent'],
});

export const CustomFieldSchema = objectType({
    name: 'CustomField',
    definition(t) {
        t.id('id');
        t.string('title');
        t.string('field');
        t.nullable.string('description');
        t.boolean('active');
        t.field({
            name: 'inputType',
            type: CustomFieldInputType,
        });
        t.nullable.boolean('isDelete');
        t.date('createdAt');
    },
});
