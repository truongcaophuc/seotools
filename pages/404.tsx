import { ErrorLayout } from '@components/layout/error';

export default function NotFoundPage() {
    return (
        <ErrorLayout
            status="404"
            backLink="/"
            description="Trang bạn yêu cầu không có trong hệ thống. Vui lòng kiểm tra lại địa chỉ trên thanh URL trình duyệt."
        />
    );
}
