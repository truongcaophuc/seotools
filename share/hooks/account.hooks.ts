import { useDashboardStore } from '@components/layout/dashboard/dashboard.store';
import { BALANCE_MIN_VALUE } from '@constants/account';
import { UserRole, WorkspaceInfoFragment } from '@generated/graphql/query';
import { useEffect, useState } from 'react';
import { useMe } from './auth.hooks';
import { useExpiredWorkspace } from './workspace.hooks';

function checkShowWarningWorkspace(workspace?: WorkspaceInfoFragment) {
    const {
        isNotWorkspacePackage,
        isExpiredPackage,
        isExpiredWordUsed,
        numberWord,
    } = useExpiredWorkspace(workspace);

    if (isNotWorkspacePackage) {
        if (workspace?.timeTrial < 0) return true;

        const isValidBalance = workspace?.balance < BALANCE_MIN_VALUE;
        return isValidBalance;
    }

    if (isExpiredPackage) return true;

    if (isExpiredWordUsed) {
        return numberWord < 1;
    }

    return false;
}

export function useValidWorkspace() {
    const [isValidBalance, setIsValidBalance] = useState<boolean>(false);
    const { isLoading, data } = useMe();
    const setIsShowWarning = useDashboardStore(
        (state) => state.setIsShowWarning
    );

    const workspace = data?.me?.workspace;

    const {
        isExpiredPackage,
        isExpiredWordUsed,
        isNotWorkspacePackage,
        numberWord,
        isExpiredBalance,
        isExpiredTrialDate,
    } = useExpiredWorkspace(workspace);

    useEffect(() => {
        //TODO: remove console.log
        function progress() {
            if (isNotWorkspacePackage) {
                console.log(1);
                // const value = checkShowWarningWorkspace(workspace);
                // console.log({ value });

                const value = isExpiredTrialDate || isExpiredBalance;

                console.log(1, value);

                setIsShowWarning(value);
                setIsValidBalance(!value);
                return;
            }

            console.log(2);
            if (isExpiredPackage) {
                console.log(2.1);
                setIsValidBalance(false);
                setIsShowWarning(true);
                return;
            }

            if (isExpiredWordUsed) {
                console.log(2.2);
                setIsShowWarning(true);
                setIsValidBalance(false);
                return;
            }

            if (numberWord < 1) {
                console.log(2.3);
                setIsShowWarning(true);
                setIsValidBalance(false);
                return;
            }

            setIsShowWarning(false);
            setIsValidBalance(true);
            return;
        }
        progress();
    }, [
        isExpiredPackage,
        isExpiredWordUsed,
        numberWord,
        isNotWorkspacePackage,
    ]);

    // useEffect(() => {
    //     console.log({isValidBalance})
    //     setIsShowWarning(!isValidBalance);
    // }, [isValidBalance]);

    return { isLoading, isValidBalance };
}

export function useUserRole(): UserRole {
    const { data } = useMe();

    return data?.me?.role;
}
