import { objectType } from 'nexus';

export const EmailSignupSchema = objectType({
    name: 'EmailSignup',
    definition(t) {
        t.id('id');
        t.string('email');
        t.date('createdAt');
    },
});
