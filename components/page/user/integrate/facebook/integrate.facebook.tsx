import { Loading } from '@components/ui';
import { useSession } from 'next-auth/react';
import { ListPageFacebook } from './list-page.facebook';
import { LoginFacebook } from './login-facebook';

export function IntegrateFacebook() {
    const { status } = useSession();

    if (status === 'loading') {
        return <Loading />;
    }

    return <LoginFacebook />;

    if (status === 'unauthenticated') {
        return <LoginFacebook />;
    }

    return <ListPageFacebook />;
}
