import { objectType } from 'nexus';

export const ProjectSchema = objectType({
    name: 'Project',
    definition(t) {
        t.id('id');
        t.string('name');
        t.string('userId');
        t.string('teamId');
        t.nullable.string('url');
        t.nullable.string('description');
        t.boolean('active');
        t.nullable.boolean('default');
        t.date('createdAt');
    },
});
