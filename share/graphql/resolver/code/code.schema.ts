import moment from 'moment';
import { objectType } from 'nexus';

export const CodeSchema = objectType({
    name: 'Code',
    definition(t) {
        t.id('id');
        t.string('code');
        t.string('email');
        t.date('createdAt');
        t.field('isExpired', {
            type: 'Boolean',
            resolve(root) {
                const now = Date.now();
                const createdAt = moment(root.createdAt).valueOf();
                const value = (now - createdAt) / (1000 * 60 * 60 * 24);

                return value > 20;
            },
        });
    },
});
