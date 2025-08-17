import { Heading, SimpleGrid, Text, VStack } from '@chakra-ui/react';
import { Card, Loading } from '@components/ui';
import { UserInfoFragment } from '@generated/graphql/query';
import { useMe } from '@share/hooks/auth.hooks';
import { cloneElement, ReactElement } from 'react';
import { FormChangeEmailUser } from './form-change-email.user';
import { FormChangePasswordUser } from './form-change-password.user';
import { FormUser } from './form.user';

interface ICardFormItem {
    label: string;
    description: string;
    children: ReactElement;
}

const cardFormList: Array<ICardFormItem> = [
    {
        label: 'Thông tin cá nhân',
        description: 'Cập nhật thông tin cá nhật của bạn',
        children: <FormUser />,
    },
    {
        label: 'Email',
        description: 'Cập nhật email của bạn',
        children: <FormChangeEmailUser />,
    },
    {
        label: 'Mật khẩu',
        description: 'Cập nhật mật khẩu của bạn',
        children: <FormChangePasswordUser />,
    },
];

interface CardFormProps {
    info: ICardFormItem;
    user?: UserInfoFragment;
}

function CardForm({ info, user }: CardFormProps) {
    return (
        <Card bgColor="white" p="6">
            <SimpleGrid columns={[1, 2]} alignItems="center">
                <VStack align="stretch">
                    <Heading as="span" fontSize="2xl" fontWeight="medium">
                        {info.label}
                    </Heading>
                    <Text fontSize="sm" color="gray.500">
                        {info.description}
                    </Text>
                </VStack>
                {cloneElement(info.children, { user })}
            </SimpleGrid>
        </Card>
    );
}

export function ContentProfile() {
    const { isLoading, data } = useMe();

    if (isLoading) {
        return <Loading full />;
    }

    return (
        <VStack align="stretch" spacing="8">
            {cardFormList.map((item) => (
                <CardForm user={data?.me} info={item} key={item.label} />
            ))}
        </VStack>
    );
}
