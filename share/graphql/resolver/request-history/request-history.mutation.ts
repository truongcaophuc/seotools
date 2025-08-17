import { mutationField, nullable } from 'nexus';

export const CreateRequestHistoryMutation = mutationField(
    'createRequestHistory',
    {
        type: nullable('RequestHistory'),
        args: {},
        resolve(_, {}, { prisma, user }) {},
    }
);
