import { list, objectType } from 'nexus';

export const TeamSchema = objectType({
    name: 'Team',
    definition(t) {
        t.id('id');
        t.string('name');
        t.id('ownerId');
        t.nullable.boolean('active');
        t.nullable.boolean('default');
        t.field({
            name: 'memberIds',
            type: list('String'),
        });
        t.field('members', {
            type: list('User'),
            resolve(parent, _, { prisma }) {
                return prisma.user.findMany({
                    where: {
                        id: {
                            in: parent.memberIds,
                        },
                    },
                });
            },
        });
        t.date('createdAt');
    },
});
