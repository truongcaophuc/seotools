import { AuthLayout } from '@components/layout/auth';
import { FormResetPassword } from '@components/page/auth';

export default function ResetPasswordPage() {
    return (
        <AuthLayout
            title="Cập nhật mật khẩu"
            description="Vui lòng điền những thông tin bên dưới để cập nhật mật khẩu của bạn"
            bottom={{
                text: 'Bạn chưa có tài khoản?',
                link: '/signup',
                label: 'Đăng ký',
            }}
        >
            <FormResetPassword />
        </AuthLayout>
    );
}
