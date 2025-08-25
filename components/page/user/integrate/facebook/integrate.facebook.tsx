import { Loading } from '@components/ui';
import { useSession, signOut } from 'next-auth/react';
import { ListPageFacebook } from './list-page.facebook';
import { LoginFacebook } from './login-facebook';

export function IntegrateFacebook() {
    const { data: session, status } = useSession();

    if (status === 'loading') {
        return <Loading />;
    }


    if (status === 'unauthenticated') {
        return <LoginFacebook />;
    }

    return <ListPageFacebook />;
}
