import Head from 'next/head';
import { ReactNode, useEffect } from 'react';
import { FeatureHomepageLayout } from './feature.homepage.layout';
import { FooterHomepageLayout } from './footer.homepage.layout';
import { HeaderHomepageLayout } from './header.homepage.layout';
import { HeroHomepageLayout } from './hero.homepage.layout';
import { LevelUpHomepageLayout } from './level-up.homepage.layout';
import { PricingHomepageLayout } from './pricing.homepage.layout';
import { WhatWeDoHomepageLayout } from './what-we-do.homepage.layout';
import { Html } from 'next/document';
import { useMe } from '@share/hooks/auth.hooks';

interface Props {
    children: ReactNode;
}

export function HomepageLayout({ children }: Props) {
    // const router = useRouter();
    // const { isLoading, data } = useMe();

    // useEffect(() => {
    //     function progress() {
    //         const me = data?.me;
    //         if (!isLoading) {
    //             if (!me) {
    //                 router.push('/login');
    //                 return;
    //             }
    //             if (me.role === UserRole.User) {
    //                 router.push('/user');
    //                 return;
    //             }
    //             if ([UserRole.Admin, UserRole.RootAdmin].includes(me.role)) {
    //                 router.push('/dashboard');
    //                 return;
    //             }
    //         }
    //     }

    //     progress();
    // }, [isLoading, data]);

    return (
        <>
            <Head>
                <title>CopyBox</title>
            </Head>
            <HeaderHomepageLayout />
            <HeroHomepageLayout />
            <FeatureHomepageLayout />
            <WhatWeDoHomepageLayout />
            <PricingHomepageLayout />
            <LevelUpHomepageLayout />
            <FooterHomepageLayout />
        </>
    );
}
