import { list, mutationField } from 'nexus';

export const CreateCodeMutation = mutationField('createCode', {
    // type: nullable('Code'),
    type: list('Int'),
    resolve(_, __, {}) {
        return [];
    },
});
