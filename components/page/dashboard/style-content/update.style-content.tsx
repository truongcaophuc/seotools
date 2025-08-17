import {
    Button,
    HStack,
    Input,
    Spacer,
    useDisclosure,
    VStack,
} from '@chakra-ui/react';
import { FormField, Modal } from '@components/ui';
import {
    StyleContentInfoFragment,
    UpdateStyleContentInputType,
} from '@generated/graphql/query';
import { useUpdateStyleContent } from '@share/hooks/style-content.hooks';
import { cloneElement, ReactElement } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

interface Props {
    children: ReactElement;
    styleContent?: StyleContentInfoFragment;
}
const schema = z.object({
    label: z
        .string()
        .min(1, 'Tên phong cách không được bỏ trống')
        .max(80, 'Tên phong cách quá dài'),
    value: z
        .string()
        .min(1, 'Giá trị phong cách không được bỏ trống')
        .max(80, 'Giá trị phong cách quá dài'),
});

export function UpdateStyleContent({ children, styleContent }: Props) {
    const { isOpen, onClose, onOpen } = useDisclosure();
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm<z.infer<typeof schema>>({
        defaultValues: {
            label: styleContent?.label,
            value: styleContent?.value,
        },
    });

    const { isLoading, mutate } = useUpdateStyleContent();

    const onSubmit = handleSubmit((data) => {
        let input: UpdateStyleContentInputType = {
            label: data.label,
            value: data.value,
        };

        if (styleContent) {
            input.id = styleContent.id;
        }

        mutate(
            { input },
            {
                onSuccess() {
                    onClose();
                },
            }
        );
    });

    const title = styleContent ? 'Cập nhật' : 'Thêm';

    return (
        <>
            {cloneElement(children, { onClick: onOpen })}
            <Modal
                title={`${title} phong cách`}
                isOpen={isOpen}
                onClose={onClose}
            >
                <VStack
                    align="stretch"
                    as="form"
                    onSubmit={onSubmit}
                    noValidate
                >
                    <FormField
                        label="Tên"
                        error={errors?.label?.message}
                        isRequired
                    >
                        <Input
                            {...register('label')}
                            placeholder="Điền tên phong cách"
                        />
                    </FormField>
                    <FormField
                        label="Giá trị"
                        error={errors?.value?.message}
                        isRequired
                    >
                        <Input
                            {...register('value')}
                            placeholder="Điền giá trị phong cách"
                        />
                    </FormField>
                    <HStack>
                        <Spacer />
                        <Button
                            type="button"
                            variant="ghost"
                            isDisabled={isLoading}
                        >
                            Huỷ
                        </Button>
                        <Button
                            isLoading={isLoading}
                            colorScheme="green"
                            type="submit"
                        >
                            {styleContent ? 'Lưu' : 'Thêm'}
                        </Button>
                    </HStack>
                </VStack>
            </Modal>
        </>
    );
}
