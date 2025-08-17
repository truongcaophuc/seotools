import { enumType, objectType } from 'nexus';

export const TypeAiSettingApp = enumType({
    name: 'TypeAiSettingApp',
    members: [
        'Title',
        'Description',
        'Outline',
        'Rewrite',
        'Write',
        'Insert',
        'Content',
    ],
    description: 'Type ai setting document generate',
});

export const AiSettingAppSchema = objectType({
    name: 'AiSettingApp',
    definition(t) {
        t.id('id');
        t.field({
            name: 'type',
            type: TypeAiSettingApp,
        });
        t.nullable.int('max_tokens');
        t.nullable.string('leadingSentence');
        t.date('createdAt');
    },
});
