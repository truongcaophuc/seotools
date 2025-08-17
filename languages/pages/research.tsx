import { Text } from '@chakra-ui/react';
import Link from 'next/link';

export const research = {
    title: {
        vi: 'Tài liệu',
        en: 'Documents',
    },
    research: {
        vi: 'Tra cứu',
        en: 'Research',
    },

    warning: {
        permission: {
            title: {
                vi: 'Tính năng đã bị khoá',
                en: 'Tính năng đã bị khoá',
            },
            message: {
                vi: 'Tính năng này chỉ áp dụng cho tài khoản Premium. Vui lòng nâng cấp tài khoản để sử dụng tính năng trên',
                en: 'Tính năng này chỉ áp dụng cho tài khoản Premium. Vui lòng nâng cấp tài khoản để sử dụng tính năng trên',
            },
        },
    },
    table: {
        name: {
            vi: 'Tên',
            en: 'Name',
        },
    },
    embedded: {
        title: {
            vi: 'Đồng bộ tài liệu',
            en: 'Đồng bộ tài liệu',
        },
        content: {
            vi: 'Bạn có muốn đồng bộ không?',
            en: 'Bạn có muốn đồng bộ không?',
        },
    },
    detail: {
        title: {
            vi: 'Tra cứu tài liệu',
            en: 'Tra cứu tài liệu',
        },
        form: {
            question: {
                placeholder: {
                    vi: 'Viết nội dung cần tra cứu',
                    en: 'Viết nội dung cần tra cứu',
                },
            },
            remove_all: {
                vi: 'Xoá tất cả',
                en: 'Remove all',
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
