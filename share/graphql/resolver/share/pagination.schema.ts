import { objectType } from 'nexus';

export const PaginationType = objectType({
    name: 'PaginationType',
    definition(t) {
        t.int('total');
        t.int('page');
        t.int('perPage');
    },
});
