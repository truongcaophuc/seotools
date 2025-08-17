import { Button, Center, Divider } from '@chakra-ui/react';
import { AuthLayout } from '@components/layout/auth';
import { FormSignup } from '@components/page/auth';
import { Loading } from '@components/ui';
import { useGetEmailSignup } from '@share/hooks/auth.hooks';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function SignupPage() {
    const router = useRouter();
    const token = router.query.t ? router.query.t.toString() : '';

    const { isLoading, data } = useGetEmailSignup(token);

    if (isLoading) {
        return <Loading full />;
    }

    const email = data?.getEmailSignup?.email;

    if (!email) {
        return (
            <AuthLayout
                title="Lỗi xác nhận"
                description="Hệ thống không tìm thấy thông tin xác nhận của bạn. Có thể thông tin bạn dùng đăng ký đã quá hạn hoặc có sai sót về đường dẫn website. Vui lòng kiểm tra lại thông tin trong hộp mail hoặc bấm vào nút bên dưới để tiến hành đăng ký lại."
                bottom={{
                    text: 'Bạn đã có tài khoản?',
                    link: '/login',
                    label: 'Đăng nhập',
                }}
            >
                <Center>
                    <Button as={Link} href="/signup/verify" colorScheme="red">
                        Đăng ký lại
                    </Button>
                </Center>
                <Divider />
            </AuthLayout>
        );
    }

    return (
        <AuthLayout
            title="Hoàn thành đăng ký"
            description="Vui lòng điền thông tin bên dưới để hoàn tất việc đăng ký tài khoản"
            bottom={{
                text: 'Bạn đã có tài khoản?',
                link: '/login',
                label: 'Đăng nhập',
            }}
        >
            <FormSignup email={email} />
        </AuthLayout>
    );
}
