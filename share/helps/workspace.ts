import {
    PackageType,
    WorkspacePackageInfoFragment,
} from '@generated/graphql/query';
import moment from 'moment';

type TWorkspacePackageTypeInfo = {
    color: string;
    label: PackageType;
};

export const packageTypes: { [key in PackageType]: TWorkspacePackageTypeInfo } =
    {
        Trial: {
            color: 'orange',
            label: PackageType.Trial,
        },
        Basic: {
            color: 'purple',
            label: PackageType.Basic,
        },
        Premium: {
            color: 'green',
            label: PackageType.Premium,
        },
    };

export function getWorkspacePackageType(
    workspacePackage: WorkspacePackageInfoFragment
): TWorkspacePackageTypeInfo {
    const type = workspacePackage?.packageItem?.packageParent?.type;

    return packageTypes[type];
}

export function getDateExpired(
    workspacePackage?: WorkspacePackageInfoFragment
): {
    isExpired: boolean;
    date?: string;
} {
    const freeTime = workspacePackage?.freeTime || 0;
    const time = workspacePackage?.time || 0;

    const now = Date.now();
    const timeUsed =
        moment(workspacePackage?.createdAt).valueOf() +
        (freeTime + time) * (1000 * 24 * 60 * 60);
    const dateExpired = moment(timeUsed).format('DD-MM-YYYY');

    return {
        isExpired: now - timeUsed > 0,
        date: dateExpired,
    };
}
