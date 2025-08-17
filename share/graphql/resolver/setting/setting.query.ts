import { nullable, queryField } from 'nexus';

export const SettingQuery = queryField('setting', {
    type: nullable('Setting'),
    resolve(_, __, { setting }) {
        return setting;
    },
});
