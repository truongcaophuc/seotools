import { objectType } from 'nexus';

export const StyleContentSchema = objectType({
    name: 'StyleContent',
    definition(t) {
        t.id('id');
        t.string('label');
        t.string('value');
        t.id('createdById');
        t.field({
            name: 'createdBy',
            type: 'User',
        });
        t.date('createdAt');
    },
});
