import { objectType } from 'nexus';

export const LanguageSchema = objectType({
    name: 'Language',
    definition(t) {
        t.id('id');
        t.string('label');
        t.nullable.string('value');
        t.id('createdById');
        t.field({
            name: 'createdBy',
            type: 'User',
        });
        t.nullable.boolean('isDefault');
        t.date('createdAt');
    },
});
