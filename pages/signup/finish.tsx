import { AuthLayout } from '@components/layout/auth';
import { FormSignupWithCode } from '@components/page/auth/form.signup-with-code';
import { useTranslate } from '@share/hooks/translate.hooks';

export default function SignUpPage() {
    const { t } = useTranslate();
    return (
        <AuthLayout
            title={t('auth.commons.complete_sign_up')}
            description={t('auth.sign_up_finish.description')}
            bottom={{
                text: t('auth.commons.hasAccount'),
                link: '/login',
                label: t('auth.commons.login'),
            }}
        >
            <FormSignupWithCode />
        </AuthLayout>
    );
}
