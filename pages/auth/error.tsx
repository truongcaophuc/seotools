import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

interface ErrorPageProps {
    error?: string;
}

const errorMessages: { [key: string]: string } = {
    Configuration: 'There is a problem with the server configuration.',
    AccessDenied: 'Access denied. You do not have permission to sign in.',
    Verification: 'The verification token has expired or has already been used.',
    Default: 'An error occurred during authentication.',
    OAuthSignin: 'Error in constructing an authorization URL.',
    OAuthCallback: 'Error in handling the response from an OAuth provider.',
    OAuthCreateAccount: 'Could not create OAuth account in the database.',
    EmailCreateAccount: 'Could not create email account in the database.',
    Callback: 'Error in the OAuth callback handler route.',
    OAuthAccountNotLinked: 'The email on the account is already linked, but not with this OAuth account.',
    EmailSignin: 'Sending the e-mail with the verification token failed.',
    CredentialsSignin: 'The authorize callback returned null in the Credentials provider.',
    SessionRequired: 'The content of this page requires you to be signed in at all times.',
};

export default function ErrorPage({ error }: ErrorPageProps) {
    const router = useRouter();
    const errorType = error || (router.query.error as string) || 'Default';
    const errorMessage = errorMessages[errorType] || errorMessages.Default;

    useEffect(() => {
        // Log error details for debugging
        console.error('NextAuth Error:', {
            error: errorType,
            query: router.query,
            timestamp: new Date().toISOString(),
        });
    }, [errorType, router.query]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Authentication Error
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Something went wrong during the authentication process
                    </p>
                </div>
                <div className="bg-red-50 border border-red-200 rounded-md p-4">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <svg
                                className="h-5 w-5 text-red-400"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </div>
                        <div className="ml-3">
                            <h3 className="text-sm font-medium text-red-800">
                                Error: {errorType}
                            </h3>
                            <div className="mt-2 text-sm text-red-700">
                                <p>{errorMessage}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="text-center">
                    <button
                        onClick={() => router.push('/')}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Go back to home
                    </button>
                </div>
                {process.env.NODE_ENV === 'development' && (
                    <div className="mt-4 p-4 bg-gray-100 rounded-md">
                        <h4 className="text-sm font-medium text-gray-900 mb-2">Debug Info:</h4>
                        <pre className="text-xs text-gray-600 overflow-auto">
                            {JSON.stringify(router.query, null, 2)}
                        </pre>
                    </div>
                )}
            </div>
        </div>
    );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { error } = context.query;
    
    return {
        props: {
            error: error || null,
        },
    };
};