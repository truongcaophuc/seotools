import { objectType } from 'nexus';

export const PexelsSchema = objectType({
    name: 'Pexels',
    definition(t) {
        t.int('id');
        t.string('avg_color');
        t.string('src'); // large default
        t.string('alt');
    },
});
