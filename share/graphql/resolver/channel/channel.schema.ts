import { objectType, enumType } from 'nexus';

const ChannelType = enumType({
    name: 'ChannelType',
    members: ['Facebook', 'Zalo', 'Wordpress'],
});

export const PageChannelSchema = objectType({
    name: 'PageChannel',
    definition(t) {
        t.id('id');
        t.string('pageChannelId');
        t.field({
            name: 'type',
            type: ChannelType,
        });
        t.nullable.string('password'); // use for wordpress
        t.nullable.string('username'); // wordpress
        t.nullable.string('url'); // wordpress
        t.nullable.string('token'); // use for facebook
        t.string('name');
        t.boolean('isActive');
        t.date('createdAt');
    },
});
