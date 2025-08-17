import { HomepageLayout } from '@components/layout/homepage';
import { Loading } from '@components/ui';

export default function IndexPage() {
    return (
        <HomepageLayout>
            <Loading full />
        </HomepageLayout>
    );
}
