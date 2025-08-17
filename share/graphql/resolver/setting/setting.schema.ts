import { objectType } from 'nexus';

export const SettingSchema = objectType({
    name: 'Setting',
    definition(t) {
        t.id('id');
        t.nullable.float('priceToken');
        t.nullable.string('documentLink');
        t.nullable.int('timeTrial');
        t.nullable.int('numberOfTimeUseGpt4');
        t.nullable.float('bonusBalanceSignup');
        t.nullable.string('fieldTitle');
        t.nullable.string('fieldDescription');
        t.nullable.string('fieldMainKeyword');
        t.nullable.string('fieldSubKeyword');
        t.nullable.string('fieldParagraph');
        t.nullable.string('fieldLanguage');
        t.nullable.string('fieldStyleContent');
        t.date('createdAt');
    },
});
