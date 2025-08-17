import { AuthLayout } from '@components/layout/auth';
import { FormForgotPassword } from '@components/page/auth/form.forgot-password';
import { useTranslate } from '@share/hooks/translate.hooks';

export default function ForgotPasswordPage() {
    const { t } = useTranslate();
    return (
        <AuthLayout
            title={t('auth.commons.forgotPassword')}
            description={t('auth.forgotPassword.description')}
            bottom={{
                text: t('auth.commons.noAccount'),
                link: '/signup/verify',
                label: t('auth.commons.sign_up'),
            }}
        >
            <FormForgotPassword />
        </AuthLayout>
    );
}
