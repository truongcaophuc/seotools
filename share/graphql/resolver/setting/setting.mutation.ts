import { middleware } from '@share/graphql/middleware';
import { arg, inputObjectType, mutationField, nullable } from 'nexus';

const UpdateSettingInputType = inputObjectType({
    name: 'UpdateSettingInputType',
    definition(t) {
        t.nullable.id('id');
        t.nullable.float('priceToken');
        t.nullable.string('documentLink');
        t.nullable.int('timeTrial');
        t.nullable.float('bonusBalanceSignup');
        t.nullable.string('fieldTitle');
        t.nullable.string('fieldDescription');
        t.nullable.string('fieldMainKeyword');
        t.nullable.string('fieldSubKeyword');
        t.nullable.string('fieldParagraph');
        t.nullable.string('fieldLanguage');
        t.nullable.string('fieldStyleContent');
        t.nullable.int('numberOfTimeUseGpt4');
    },
});

export const UpdateSettingMuttation = mutationField('updateSetting', {
    type: nullable('Setting'),
    authorize: (_, __, context) => middleware.isAdmin(context),
    args: { input: arg({ type: UpdateSettingInputType }) },
    resolve(_, { input: { id, ...data } }, { prisma, setting }) {
        if (setting) {
            return prisma.setting.update({
                where: { id: setting.id },
                data: { ...data },
            });
        }

        return prisma.setting.create({
            data: { ...data },
        });
    },
});
