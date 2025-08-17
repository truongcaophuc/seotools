import { list, queryField } from 'nexus';

export const AiSettingAppsQuery = queryField('aiSettingApps', {
    type: list('AiSettingApp'),
    resolve(_, {}, { prisma }) {
        return prisma.aiSettingApp.findMany({});
    },
});
