import { setSessionUser } from '@share/helps/session';
import { nullable, queryField } from 'nexus';

export const MeQuery = queryField('me', {
    type: nullable('User'),
    async resolve(_, __, { user, req }) {
        if (!user) {
            await setSessionUser(req, null);
        }

        return user;
    },
});
