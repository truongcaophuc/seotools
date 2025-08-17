import { Text } from '@chakra-ui/react';
import Link from 'next/link';

export const chatbot = {
    new_conversation: {
        vi: 'Hộp thoại mới',
        en: 'New conversation',
    },
    remove_conversation: {
        content: {
            vi: 'Bạn chắc chắn muốn xoá hộp thoại này?',
            en: 'Bạn chắc chắn muốn xoá hộp thoại này?',
        },
    },
    form: {
        title: {
            label: {
                vi: 'Tên hội thoại',
                en: 'Tên hội thoại',
            },
            placeholder: {
                vi: 'Điền tên hội thoại',
                en: 'Điền tên hội thoại',
            },
            error: {
                required: {
                    vi: 'Tên hội thoại không được bỏ trống',
                    en: 'Tên hội thoại không được bỏ trống',
                },
            },
        },
    },
    messages: {
        conversation: {
            add: {
                success: {
                    vi: 'Thêm hội thoại thành công',
                    en: 'Thêm hội thoại thành công',
                },
                fail: {
                    vi: 'Thêm hội thoại không thành công',
                    en: 'Thêm hội thoại không thành công',
                },
            },
            update: {
                success: {
                    vi: 'Cập nhật hội thoại thành công',
                    en: 'Cập nhật hội thoại thành công',
                },
                fail: {
                    vi: 'Cập nhật hội thoại không thành công',
                    en: 'Cập nhật hội thoại không thành công',
                },
            },
            delete: {
                success: {
                    vi: 'Xoá hội thoại thành công',
                    en: 'Xoá hội thoại thành công',
                },
                fail: {
                    vi: 'Xoá hội thoại không thành công',
                    en: 'Xoá hội thoại không thành công',
                },
            },
        },
        embed: {
            sync: {
                success: {
                    vi: 'Đồng bộ tài liệu thành công',
                    en: 'Đồng bộ tài liệu thành công',
                },
                fail: {
                    vi: 'Đồng bộ tài liệu không thành công',
                    en: 'Đồng bộ tài liệu không thành công',
                },
            },
        },
    },
    chat: {
        form: {
            question: {
                placeholder: {
                    vi: 'Viết nội dung cần hỏi',
                    en: 'Viết nội dung cần hỏi',
                },
            },
            help_text: {
                vi: (
                    <>
                        (Vui lòng gõ <Text as="b"> "Tiếp"</Text> để tiếp tục với
                        nội dung bỏ ngỏ )
                    </>
                ),
                en: (
                    <>
                        ( Vui lòng gõ <Text as="b">"Tiếp"</Text> để tiếp tục với
                        nội dung bỏ ngỏ )
                    </>
                ),
            },
            warning: {
                vi: (
                    <>
                        Tài khoản đã hết hạn hoặc không đủ số từ để sử dụng. Vui
                        lòng nhấn{' '}
                        <Text
                            textDecoration="underline"
                            color="blue.600"
                            fontWeight="semibold"
                            as={Link}
                            href="/user/workspace"
                        >
                            vào đây
                        </Text>{' '}
                        để{' '}
                        <Text as="span" fontWeight="semibold">
                            Gia hạn hoặc Mua thêm từ
                        </Text>
                    </>
                ),
                en: (
                    <>
                        Tài khoản đã hết hạn hoặc không đủ số từ để sử dụng. Vui
                        lòng nhấn{' '}
                        <Text
                            textDecoration="underline"
                            color="blue.600"
                            fontWeight="semibold"
                            as={Link}
                            href="/user/workspace"
                        >
                            vào đây
                        </Text>{' '}
                        để{' '}
                        <Text as="span" fontWeight="semibold">
                            Gia hạn hoặc Mua thêm từ
                        </Text>
                    </>
                ),
            },
        },
    },
};
