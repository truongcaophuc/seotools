import { Context } from '../context/type.context';

export const middleware = {
    auth: (context: Context) => !!context.user,
    isOwner: (context: Context) => {
        return ['RootAdmin', 'Admin', 'User'].includes(context?.user?.role);
    },
    isAdmin: (context: Context) =>
        ['RootAdmin', 'Admin'].includes(context?.user?.role),
};
