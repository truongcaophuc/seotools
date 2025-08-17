import {
    Alert,
    AlertDescription,
    AlertIcon,
    AlertTitle,
    Box,
    Button,
    Input,
    Skeleton,
    Text,
    VStack,
} from '@chakra-ui/react';
import { Captcha, FormField, Password } from '@components/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { useResetPassword } from '@share/hooks/auth.hooks';
import { useCode } from '@share/hooks/code.hooks';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const schema = z
    .object({
        password: z.string().min(8, 'Mật khẩu phải lớn hơn 8 ký tự'),
        confirmPassword: z
            .string()
            .min(8, 'Mật khẩu xác nhận phải lớn hơn 8 ký tự'),
        captcha: z.string(),
        reCaptcha: z.string().min(6, 'Mã xác nhận '),
    })
    .refine((data) => data.captcha === data.reCaptcha, {
        message: 'Mã xác nhận không đúng',
        path: ['reCaptcha'],
    });

type FormResetPasswordData = z.infer<typeof schema>;

export function FormResetPassword() {
    const router = useRouter();
    const code = router.query.code ? router.query.code.toString() : null;
    const { isLoading: isLoadingCode, data } = useCode(code);
    const { isLoading, mutate } = useResetPassword();

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<FormResetPasswordData>({
        resolver: zodResolver(schema),
    });

    const handleSetCaptcha = (value: string) => {
        setValue('captcha', value);
    };

    const onSubmit = handleSubmit((data) => {
        mutate(
            {
                input: {
                    code,
                    password: data.password,
                },
            },
            {
                onSuccess() {
                    router.push('/login');
                },
            }
        );
    });

    const codeData = data?.code;

    return (
        <Skeleton bgColor="gray.50" isLoaded={!isLoadingCode}>
            <VStack
                align="stretch"
                spacing="5"
                as="form"
                noValidate
                onSubmit={onSubmit}
            >
                {!codeData?.isExpired ? (
                    <Alert rounded="md" status="error">
                        <AlertIcon />
                        <Box>
                            <AlertTitle>Hết hạn</AlertTitle>
                            <AlertDescription fontSize="sm">
                                Đường dẫn này đã hết hạn sử dụng. Vui lòng gửi
                                lại yêu cầu mới{' '}
                                <Text
                                    fontWeight="medium"
                                    textDecoration="underline"
                                    as={Link}
                                    href="/forgot-password"
                                >
                                    tại đây
                                </Text>
                                .
                            </AlertDescription>
                        </Box>
                    </Alert>
                ) : null}
                <FormField
                    isRequired
                    label="Mật khẩu mới"
                    error={errors?.password?.message}
                >
                    <Password
                        {...register('password')}
                        placeholder="Điền mật khẩu mới"
                    />
                </FormField>
                <FormField
                    isRequired
                    label="Mật khẩu xác nhận"
                    error={errors?.confirmPassword?.message}
                >
                    <Password
                        {...register('confirmPassword')}
                        placeholder="Điền mật khẩu xác nhận mới"
                    />
                </FormField>

                <Input hidden isReadOnly {...register('captcha')} />

                <FormField
                    label="Mã xác nhận"
                    isRequired
                    error={errors?.reCaptcha?.message}
                >
                    <VStack align="stretch">
                        <Captcha onChangeCaptcha={handleSetCaptcha} />
                        <Input
                            placeholder="Điền mã xác nhận"
                            {...register('reCaptcha')}
                        />
                    </VStack>
                </FormField>
                <Button
                    isLoading={isLoading}
                    colorScheme="green"
                    type="submit"
                    isDisabled={codeData?.isExpired}
                >
                    {codeData?.isExpired ? 'Hết hạn' : 'Đổi mật khẩu'}
                </Button>
            </VStack>
        </Skeleton>
    );
}
