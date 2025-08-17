import { HStack, IconButton, IconButtonProps } from '@chakra-ui/react';
import { ListBulletIcon, Squares2X2Icon } from '@heroicons/react/24/outline';
import { HeroIcon } from '../icon';

export type TViewType = 'list' | 'grid';

interface Props {
    onChange: (type: TViewType) => void;
    type: TViewType;
}

const buttons: Array<{ label: string; icon: any; type: TViewType }> = [
    { icon: <HeroIcon as={ListBulletIcon} />, type: 'list', label: 'List' },
    { icon: <HeroIcon as={Squares2X2Icon} />, type: 'grid', label: 'Grid' },
];

interface ButtonTypeProps extends IconButtonProps {
    active: boolean;
}

function ButtonType({ active, ...props }: ButtonTypeProps) {
    return (
        <IconButton
            {...props}
            bgColor={active ? 'white' : 'transparent'}
            _hover={{
                bgColor: active ? 'white' : 'transparent',
                color: 'gray.600',
            }}
            color={active ? 'gray.500' : 'gray.300'}
            borderWidth={active ? '1px' : 0}
            size="sm"
        />
    );
}

export function ViewType({ onChange, type = 'grid' }: Props) {
    return (
        <HStack spacing="0" borderWidth="1px" bgColor="gray.100" rounded="md">
            {buttons.map((item) => (
                <ButtonType
                    key={item.type}
                    active={type === item.type}
                    aria-label={item.label}
                    onClick={() => onChange(item.type)}
                    icon={item.icon}
                />
            ))}
        </HStack>
    );
}
