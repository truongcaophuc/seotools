import { query } from 'express';
import { enumType, nullable, objectType, queryField } from 'nexus';

const ConversationType = enumType({
    name: 'ConversationType',
    members: ['Chat', 'Research'],
});

export const ConversationSchema = objectType({
    name: 'Conversation',
    definition(t) {
        t.id('id');
        t.string('title');
        t.id('projectId');
        t.nullable.id('docId');
        t.field('doc', {
            type: nullable('Image'),
            resolve(root, _, { prisma }) {
                if (!root.docId) return null;
                return prisma.image.findFirst({
                    where: { id: root.docId },
                });
            },
        });
        t.nullable.field({
            type: ConversationType,
            name: 'type',
        });
        t.field({
            name: 'createdBy',
            type: 'User',
        });
        t.date('createdAt');
    },
});

export const ConversationItemSchema = objectType({
    name: 'ConversationItem',
    definition(t) {
        t.id('id');
        t.string('message');
        t.nullable.id('createdById');
        t.field('createdBy', {
            type: nullable('User'),
            resolve(root, _, { prisma }) {
                if (!root.createdById) return null;
                return prisma.user.findFirst({
                    where: { id: root.createdById },
                });
            },
        });
        t.date('createdAt');
    },
});
