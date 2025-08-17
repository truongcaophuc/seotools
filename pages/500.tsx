import { ErrorLayout } from '@components/layout/error';

export default function ErrorPage() {
    return (
        <ErrorLayout
            status="500"
            backLink="/"
            description="Đã có lỗi xảy ra. Vui lòng tải lại trình duyệt của bạn hoặc quay lại trang chủ."
        />
    );
}
