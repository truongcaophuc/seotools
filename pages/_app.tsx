import { SessionProvider } from 'next-auth/react';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { seos } from '@constants/seo';
import {
    Hydrate,
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Head from 'next/head';
import { useState } from 'react';
import '../style/style.scss';

const theme = extendTheme({
    colors: {
        brand: '#BB2649',
        brand_light: '#df466a',
    },
});

function MyApp({ Component, pageProps }) {
    const [queryClient] = useState(() => new QueryClient());

    return (
        <SessionProvider session={pageProps.session}>
            <>
                <Head>
                    <meta property="title" content={seos.title} />
                    <meta name="description" content={seos.description} />

                    <meta property="og:type" content="website" />
                    <meta property="og:title" content={seos.title} />
                    <meta
                        property="og:description"
                        content={seos.description}
                    />

                    <meta property="og:image" content={seos.thumbnail} />
                    <meta property="og:url" content={seos.url} />

                    <meta property="og:locale" content="" />
                    <meta property="og:site_name" content="Copybox" />
                    <meta property="fb:app_id" content="" />

                    <meta name="twitter:card" content="summary_large_image" />
                    <meta name="twitter:site" content="" />
                    <meta name="twitter:title" content={seos.title} />
                    <meta
                        name="twitter:description"
                        content={seos.description}
                    />
                    <meta name="twitter:image:src" content={seos.thumbnail} />
                    <meta name="twitter:creator" content="" />

                    <link
                        rel="apple-touch-icon"
                        sizes="180x180"
                        href="/apple-touch-icon.png"
                    />
                    <link
                        rel="icon"
                        type="image/png"
                        sizes="32x32"
                        href="/favicon-32x32.png"
                    />
                    <link
                        rel="icon"
                        type="image/png"
                        sizes="16x16"
                        href="/favicon-16x16.png"
                    />
                    <link rel="manifest" href="/site.webmanifest"></link>
                    <title>{seos.title}</title>
                </Head>

                <QueryClientProvider client={queryClient}>
                    <Hydrate state={pageProps?.dehydratedState}>
                        <ChakraProvider theme={theme}>
                            <Component {...pageProps} />
                        </ChakraProvider>
                    </Hydrate>
                    <ReactQueryDevtools position="bottom-right" />
                </QueryClientProvider>
            </>
        </SessionProvider>
    );
}

export default MyApp;
