import { Text } from '@chakra-ui/react';
import Link from 'next/link';

export const auth = {
    commons: {
        sign_up: {
            vi: 'Đăng ký',
            en: 'Sign up',
        },
        login: {
            vi: 'Đăng nhập',
            en: 'Login',
        },
        forgotPassword: {
            vi: 'Quên mật khẩu?',
            en: 'Forgot password?',
        },
        noAccount: {
            vi: 'Bạn chưa có tài khoản?',
            en: 'Do not have an account?',
        },
        hasAccount: {
            vi: 'Bạn đã có tài khoản?',
            en: 'Do have an account?',
        },
        send_request: {
            vi: 'Gửi đăng cầu',
            en: 'Send request',
        },
        complete_sign_up: { vi: ' Hoàn tất đăng ký', en: 'Complete sign up' },
    },
    messages: {
        login: {
            fail: {
                vi: 'Đăng nhập thất bại',
                en: 'Login failed',
            },
            success: {
                vi: 'Đăng nhập thành công',
                en: 'Login success',
            },
        },
        sign_up: {
            fail: {
                vi: 'Đăng ký thất bại',
                en: 'Sign up failed',
            },
            success: {
                vi: 'Đăng ký thành công',
                en: 'Sign up success',
            },
        },
        sign_up_with_code: {
            fail: {
                vi: 'Đã xảy ra lỗi, vui lòng thử lại',
                en: 'Đã xảy ra lỗi, vui lòng thử lại',
            },
            success: {
                vi: 'Đăng ký thành công',
                en: 'Sign up success',
            },
        },
        sign_up_verify: {
            fail: {
                vi: 'Đã xảy ra lỗi, vui lòng thử lại',
                en: 'Đã xảy ra lỗi, vui lòng thử lại',
            },
            success: {
                vi: 'Đăng ký thành công',
                en: 'Sign up success',
            },
        },
        forgot_password: {
            fail: {
                vi: 'Đã xảy ra lỗi, vui lòng thử lại',
                en: 'Đã xảy ra lỗi, vui lòng thử lại',
            },
            success: {
                vi: 'Gửi yêu cầu thành công',
                en: 'Gửi yêu cầu thành công',
            },
        },
        reset_password: {
            fail: {
                vi: 'Đổi mật khẩu không thành công',
                en: 'Đổi mật khẩu không thành công',
            },
            success: {
                vi: 'Đổi mật khẩu thành công',
                en: 'Đổi mật khẩu thành công',
            },
        },
        logout: {
            fail: {
                vi: 'Đăng xuất thất bại',
                en: 'Đăng xuất thất bại',
            },
            success: {
                vi: 'Đăng xuất thành công',
                en: 'Đăng xuất thành công',
            },
        },
        change_email: {
            fail: {
                vi: 'Đổi email không thành công',
                en: 'Đổi email không thành công',
            },
            success: {
                vi: 'Đổi email thành công',
                en: 'Đổi email thành công',
            },
        },
    },
    form: {
        email: {
            label: {
                vi: 'Email',
                en: 'Email',
            },
            placeholder: {
                vi: 'Điền địa chỉ email',
                en: 'Type email address',
            },
            error: {
                required: {
                    vi: 'Địa chỉ email không được bỏ trống',
                    en: 'Địa chỉ email không được bỏ trống',
                },
                format: {
                    vi: 'Địa chỉ email không đúng định dạng',
                    en: 'Địa chỉ email không đúng định dạng',
                },
                valid: {
                    vi: 'Email không hợp lệ',
                    en: 'Email không hợp lệ',
                },
            },
        },
        username_email: {
            label: {
                vi: 'Tên đăng nhập / Email',
                en: 'Username / Email',
            },
            placeholder: {
                vi: 'Điền Tên đăng nhập / Email',
                en: 'Type your Username  / Email',
            },
            error: {
                min: {
                    vi: 'Tên đăng nhập phải lớn hơn 6 ký tự',
                    en: 'Tên đăng nhập phải lớn hơn 6 ký tự',
                },
            },
        },
        username: {
            label: {
                vi: 'Tên đăng nhập',
                en: 'Username',
            },
            placeholder: {
                vi: 'Điền Tên đăng nhập',
                en: 'Type your Username',
            },
            error: {
                min: {
                    vi: 'Tên đăng nhập phải lớn hơn 6 ký tự',
                    en: 'Tên đăng nhập phải lớn hơn 6 ký tự',
                },
            },
        },
        fullname: {
            label: {
                vi: 'Họ tên',
                en: 'Full name',
            },
            placeholder: {
                vi: 'Điền Họ Tên',
                en: 'Type your full name',
            },
            error: {
                min: {
                    vi: 'Họ tên phải lớn hơn 6 ký tự',
                    en: 'Họ tên phải lớn hơn 6 ký tự',
                },
                max: {
                    vi: 'Họ tên quá dài',
                    en: 'Họ tên quá dài',
                },
            },
        },
        phone_number: {
            label: {
                vi: 'Số điện thoại',
                en: 'Phone number',
            },
            placeholder: {
                vi: 'Điền Số điện thoại',
                en: 'Type your phone number',
            },
            error: {
                required: {
                    vi: 'Số điện thoại không được bỏ trống',
                    en: 'Số điện thoại không được bỏ trống',
                },
            },
        },

        password: {
            label: { vi: 'Mật khẩu', en: 'Password' },
            placeholder: {
                vi: 'Điền mật khẩu',
                en: 'Type your password',
            },
            error: {
                min: {
                    vi: 'Mật khẩu phải lớn hơn 7 ký tự',
                    en: 'Mật khẩu phải lớn hơn 7 ký tự',
                },
                max: {
                    vi: 'Mật khẩu quá dài',
                    en: 'Mật khẩu quá dài',
                },
            },
        },
        captcha: {
            label: {
                vi: 'Mã xác nhận',
                en: 'Captcha',
            },

            placeholder: {
                vi: 'Điền Mã xác nhận',
                en: 'Type captcha',
            },
            error: {
                required: {
                    vi: 'Mã xác nhận không được bỏ trống',
                    en: 'Mã xác nhận không được bỏ trống',
                },
                match: {
                    vi: 'Mã xác nhận không đúng',
                    en: 'Captcha does not match',
                },
            },
        },
        code: {
            label: { vi: 'Mã xác nhận', en: 'Code' },
            placeholder: {
                vi: 'Điền Mã xác nhận',
                en: 'Type your code',
            },
            error: {
                required: {
                    vi: 'Mã xác nhận không được bỏ trống',
                    en: 'Mã xác nhận không được bỏ trống',
                },
            },
        },
    },

    login: {
        description: {
            vi: 'Đăng nhập để sử dụng tiện ích',
            en: 'Đăng nhập để sử dụng tiện ích',
        },
    },
    sign_up: {
        description: {
            vi: 'Vui lòng điền địa chỉ email chính xác để nhận mã đăng ký tài khoản.',
            en: 'Vui lòng điền địa chỉ email chính xác để nhận mã đăng ký tài khoản.',
        },
        alert: {
            vi: (
                <>
                    Đã có mã xác nhận, vui lòng bấm{' '}
                    <Text
                        fontWeight="bold"
                        decoration="underline"
                        as={Link}
                        href="/signup/finish"
                    >
                        vào đây
                    </Text>{' '}
                    để hoàn tất việc đăng ký.
                </>
            ),
            en: (
                <>
                    Đã có mã xác nhận, vui lòng bấm{' '}
                    <Text
                        fontWeight="bold"
                        decoration="underline"
                        as={Link}
                        href="/signup/finish"
                    >
                        vào đây
                    </Text>{' '}
                    để hoàn tất việc đăng ký.
                </>
            ),
        },
        success_message: {
            vi: 'Vui lòng kiểm tra email sau đó hoàn tất việc đăng ký theo hướng dẫn. (Kiểm tra hộp thư spam nếu không nhận được email trong hộp mail chính)',
            en: 'Vui lòng kiểm tra email sau đó hoàn tất việc đăng ký theo hướng dẫn. (Kiểm tra hộp thư spam nếu không nhận được email trong hộp mail chính)',
        },
    },
    sign_up_finish: {
        description: {
            vi: 'Vui lòng điền thông tin bên dưới để hoàn tất việc đăng ký tài khoản',
            en: 'Vui lòng điền thông tin bên dưới để hoàn tất việc đăng ký tài khoản',
        },
    },
    forgotPassword: {
        description: {
            vi: 'Điền địa chỉ email bên dưới để gửi yêu cầu đổi lại mật khẩu.',
            en: 'Điền địa chỉ email bên dưới để gửi yêu cầu đổi lại mật khẩu.',
        },
        messaage: {
            success: {
                vi: 'Đã gửi yêu cầu đổi mật khẩu thành công. Vui lòng kiểm tra email rồi làm theo hướng dẫn.',
                en: 'Đã gửi yêu cầu đổi mật khẩu thành công. Vui lòng kiểm tra email rồi làm theo hướng dẫn.',
            },
        },
    },
};
