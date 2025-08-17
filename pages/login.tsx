import { AuthLayout } from '@components/layout/auth';
import { FormLogin } from '@components/page/auth';
import { useTranslate } from '@share/hooks/translate.hooks';

export default function LoginPage() {
    const { t } = useTranslate();
    return (
        <AuthLayout
            title={t('auth.commons.login')}
            description={t('auth.login.description')}
            bottom={{
                text: t('auth.commons.noAccount'),
                link: '/signup/verify',
                label: t('auth.commons.sign_up'),
            }}
        >
            <FormLogin />
        </AuthLayout>
    );
}
