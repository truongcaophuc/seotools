import { verifyToken } from '@share/helps/token';
import { get } from 'lodash';
import { nullable, queryField, stringArg } from 'nexus';

export const GetEmailSignup = queryField('getEmailSignup', {
    type: nullable('EmailSignup'),
    args: { token: stringArg() },
    resolve(_, { token }, { prisma }) {
        try {
            const data = verifyToken(token);
            const email = get(data, 'data');

            return prisma.emailSignup.findFirst({
                where: {
                    email,
                },
            });
        } catch (error) {
            console.log({ error });
            return null;
        }
    },
});
