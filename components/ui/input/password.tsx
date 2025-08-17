import {
    forwardRef,
    Icon,
    IconButton,
    Input,
    InputGroup,
    InputProps,
    InputRightElement,
} from '@chakra-ui/react';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

interface Props extends Partial<InputProps> {}

export const Password = forwardRef((props: Props, ref: any) => {
    const [show, setShow] = useState(false);
    const handleClick = () => setShow((v) => !v);

    const icon = !show ? EyeIcon : EyeSlashIcon;

    return (
        <InputGroup>
            <Input
                ref={ref}
                pr="3rem"
                type={show ? 'text' : 'password'}
                {...props}
            />
            <InputRightElement width="3rem">
                <IconButton
                    bgColor="transparent"
                    _hover={{
                        bgColor: 'transparent',
                    }}
                    onClick={handleClick}
                    aria-label="Show password"
                    icon={<Icon as={icon} boxSize="5" color="gray" />}
                />
            </InputRightElement>
        </InputGroup>
    );
});
