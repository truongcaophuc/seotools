import { arg, inputObjectType, mutationField, nullable } from 'nexus';

const CreateAiSettingAppInputType = inputObjectType({
    name: 'CreateAiSettingAppInputType',
    definition(t) {
        t.nullable.string('leadingSentence');
        t.nullable.id('id');
        t.nullable.int('max_tokens');
        t.field({
            name: 'type',
            type: 'TypeAiSettingApp',
        });
    },
});

export const CreateAiSettingAppMuttaion = mutationField('createAiSettingApp', {
    type: nullable('AiSettingApp'),
    args: { input: arg({ type: CreateAiSettingAppInputType }) },
    async resolve(
        _,
        { input: { id, leadingSentence, type, max_tokens } },
        { prisma }
    ) {
        if (id) {
            return prisma.aiSettingApp.update({
                where: { id },
                data: {
                    leadingSentence,
                    type,
                    max_tokens,
                },
            });
        }

        return prisma.aiSettingApp.create({
            data: {
                leadingSentence,
                type,
                max_tokens,
            },
        });
    },
});
