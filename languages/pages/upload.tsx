import { Text } from '@chakra-ui/react';

export const upload = {
    commons: {
        all_folder: {
            vi: 'Tất cả thư mục',
            en: 'All folder',
        },
        folder: {
            vi: 'Thư mục',
            en: 'Folder',
        },
        title_upload: {
            vi: (
                <>
                    <Text as="label" htmlFor="inputFile" color="gray.600">
                        Nhấn để upload
                    </Text>{' '}
                    hoặc Kéo thả để upload
                </>
            ),
            en: (
                <>
                    <Text as="label" htmlFor="inputFile" color="gray.600">
                        Nhấn để upload
                    </Text>{' '}
                    hoặc Kéo thả để upload
                </>
            ),
        },
        accept_upload: {
            vi: 'Dung lượng file vượt quá mức cho phép',
            en: 'Dung lượng file vượt quá mức cho phép',
        },
    },

    images: {
        title: {
            vi: 'Hình ảnh',
            en: 'Gallery',
        },
        folder: {
            vi: 'Thư mục ảnh',
            en: 'Folder image',
        },
        table: {
            image: {
                vi: 'Hình ảnh',
                en: 'Image',
            },
            folder: {
                vi: 'Thư mục ảnh',
                en: 'Folder image',
            },
        },
    },
    folder_image: {
        title: {
            vi: 'Thêm thư mục',
            en: 'Add folder',
        },
        card: {
            document: {
                vi: 'tài liệu',
                en: 'document',
            },
            image: {
                vi: 'ảnh',
                en: 'picture',
            },
        },
        form: {
            name: {
                label: {
                    vi: 'Tên',
                    en: 'Name',
                },
                placeholder: {
                    vi: 'Điền tên thư mục',
                    en: 'Type name folder',
                },
                error: {
                    required: {
                        vi: 'Tên thư mục không được bỏ trống',
                        en: 'Tên thư mục không được bỏ trống',
                    },
                },
            },
            description: {
                label: {
                    vi: 'Mô tả',
                    en: 'Description',
                },
                placeholder: {
                    vi: 'Viết mô tả về thư mục',
                    en: 'Viết mô tả về thư mục',
                },
            },
        },
        table: {
            name: {
                vi: 'Tên',
                en: 'Name',
            },
            quantity_image: {
                vi: 'Số lượng ảnh',
                en: 'Quantity image',
            },
        },
        delete: {
            title: {
                vi: 'Xoá thư mục',
                en: 'Delete folder',
            },
            content: {
                vi: 'Bạn chắc chắn muốn xoá thư mục',
                en: 'Bạn chắc chắn muốn xoá thư mục',
            },
        },
    },

    document: {
        title: {
            vi: 'Tài liệu',
            en: 'Document',
        },
        folder: {
            vi: 'Thư mục',
            en: 'Folder',
        },
    },
    messages: {
        file: {
            update: {
                success: {
                    vi: 'Chỉnh sửa hình ảnh thành công',
                    en: 'Chỉnh sửa hình ảnh thành công',
                },
                fail: {
                    vi: 'Chỉnh sửa hình ảnh không thành công',
                    en: 'Chỉnh sửa hình ảnh không thành công',
                },
            },
            upload: {
                success: {
                    vi: 'Upload hình ảnh thành công',
                    en: 'Upload hình ảnh thành công',
                },
                fail: {
                    vi: 'Upload hình ảnh không thành công',
                    en: 'Upload hình ảnh không thành công',
                },
            },
            delete: {
                success: {
                    vi: 'Xoá hình ảnh thành công',
                    en: 'Xoá hình ảnh thành công',
                },
                fail: {
                    vi: 'Xoá hình ảnh không thành công',
                    en: 'Xoá hình ảnh không thành công',
                },
            },
        },
        folder: {
            add: {
                success: {
                    vi: 'Thêm thư mục thành công',
                    en: 'Thêm thư mục thành công',
                },
                fail: {
                    vi: 'Thêm thư mục không thành công',
                    en: 'Thêm thư mục không thành công',
                },
            },
            update: {
                success: {
                    vi: 'Cập nhật thư mục thành công',
                    en: 'Cập nhật thư mục thành công',
                },
                fail: {
                    vi: 'Cập nhật thư mục không thành công',
                    en: 'Cập nhật thư mục không thành công',
                },
            },
            delete: {
                success: {
                    vi: 'Xoá thư mục thành công',
                    en: 'Xoá thư mục thành công',
                },
                fail: {
                    vi: 'Xoá thư mục không thành công',
                    en: 'Xoá thư mục không thành công',
                },
            },
        },
    },
};
