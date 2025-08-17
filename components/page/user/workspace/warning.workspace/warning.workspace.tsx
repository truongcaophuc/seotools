import { Alert, AlertDescription, AlertIcon } from '@components/ui';
import { WorkspaceInfoFragment } from '@generated/graphql/query';
import { useMe } from '@share/hooks/auth.hooks';
import { TFunction, useTranslate } from '@share/hooks/translate.hooks';
import { useExpiredWorkspace } from '@share/hooks/workspace.hooks';
import { number } from 'zod';

// function getContent(workspace?: WorkspaceInfoFragment): string | undefined {
//     if (workspace?.isTrial) {
//         if (workspace.timeTrial <= 0) {
//             return 'Tài khoản của bạn đã hết hạn dùng thử';
//         }
//         if (workspace.timeTrial <= 0) {
//             return 'Tài khoản của bạn đã hết hạn dùng thử.';
//         }

//         if (workspace?.timeTrial > 0 && workspace.timeTrial <= 5) {
//             return 'Tài khoản của bạn gần hết hạn hạn dùng thử.';
//         }

//         return `Tài khoản này còn ${workspace?.timeTrial} ngày để dùng thử.`;
//     }

//     if (workspace?.balance <= 0) {
//         return 'Số dư của tài khoản không đủ. Vui lòng nạp thêm để tiếp tục sử dụng.';
//     }

//     return;
// }

function getContent({
    isExpiredPackage,
    isNotWorkspacePackage,
    isExpiredWordUsed,
    numberWord,
    timeTrial,
    isTrial,
    t,
}: {
    isExpiredPackage: boolean;
    isNotWorkspacePackage: boolean;
    isExpiredWordUsed: boolean;
    numberWord: number;
    timeTrial: number;
    isTrial: boolean;
    t: TFunction;
}) {
    if (isNotWorkspacePackage) {
        if (timeTrial < 0) {
            return 'Tài khoản của bạn đã hết hạn dùng thử';
        }

        return `Tài khoản này còn ${timeTrial} ngày để dùng thử.`;
    }

    if (isExpiredPackage) {
        if (isTrial) {
            return t('commons.warning.is_expired_package.trial');
        }

        return t('commons.warning.is_expired_package.not_trial');
    }

    if (!isExpiredWordUsed && numberWord < 1) {
        return t('commons.warning.is_expired_package.number_word');
    }

    return;
}

export function WarningWorkspace() {
    const { t } = useTranslate();
    const { data } = useMe();
    const workspace = data?.me?.workspace;

    const {
        isExpiredPackage,
        isExpiredWordUsed,
        isNotWorkspacePackage,
        numberWord,
        isTrial,
    } = useExpiredWorkspace(workspace);

    const content = getContent({
        isExpiredPackage,
        isExpiredWordUsed,
        isNotWorkspacePackage,
        numberWord,
        isTrial,
        timeTrial: workspace?.timeTrial,
        t,
    });

    if (!content) {
        return <></>;
    }

    return (
        <Alert status="error">
            <AlertIcon />
            <AlertDescription>{content}</AlertDescription>
        </Alert>
    );
}
