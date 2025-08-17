import { BASE_URL } from '@constants/general';
import { PackageType } from '@prisma/client';
import { AUTH_ERROR } from '@share/error/auth.error';
import { Context } from '@share/graphql/context/type.context';
import { generateCode } from '@share/helps/code';
import { sendEmail, templateEmail } from '@share/helps/email';
import { checkPassword, generalPasswordHash } from '@share/helps/password';
import { setSessionUser } from '@share/helps/session';
import { slugify } from '@share/helps/slugify';
import { generateToken } from '@share/helps/token';
import {
    arg,
    inputObjectType,
    mutationField,
    nonNull,
    nullable,
    stringArg,
} from 'nexus';

const LoginInputType = inputObjectType({
    name: 'LoginInputType',
    definition(t) {
        t.string('username');
        t.string('password');
    },
});

export const LoginMutation = mutationField('login', {
    type: nullable('User'),
    args: { input: arg({ type: LoginInputType }) },
    async resolve(_, { input: { username, password } }, { prisma, req }) {
        const user = await prisma.user.findFirst({
            where: {
                OR: [
                    {
                        email: username,
                    },
                    {
                        username,
                    },
                ],
            },
        });

        if (!user) {
            await setSessionUser(req, null);
            throw new Error(AUTH_ERROR.USER_NOT_FOUND);
        }

        const isValidPassword = await checkPassword({
            password,
            passwordHash: user.password,
        });

        if (!isValidPassword) {
            await setSessionUser(req, null);
            throw new Error(AUTH_ERROR.USER_NOT_FOUND);
        }

        await setSessionUser(req, user.id);

        return user;
    },
});

const SignupInputType = inputObjectType({
    name: 'SignupInputType',
    definition(t) {
        t.nullable.string('fullname');
        t.nonNull.string('username');
        t.nonNull.string('email');
        t.nonNull.string('phoneNumber');
        t.nonNull.string('password');
    },
});

function getBalance(context: Context): Promise<number> {
    return new Promise(async function (resolve) {
        const settingCtx = context?.setting;

        if (settingCtx) {
            resolve(settingCtx.bonusBalanceSignup);
            return;
        }

        const settingRes = await context.prisma.setting.findFirst({});

        if (!settingRes) {
            return resolve(500000);
        }

        return resolve(settingRes?.bonusBalanceSignup);
    });
}

export const SignupMutation = mutationField('signUp', {
    type: nullable('User'),
    args: { input: arg({ type: SignupInputType }) },
    async resolve(
        _,
        { input: { password, email, fullname, username, phoneNumber } },
        context
    ) {
        const { prisma, req } = context;
        const userExist = await prisma.user.findFirst({
            where: {
                OR: [
                    {
                        email: username,
                    },
                    {
                        username,
                    },
                ],
            },
        });

        if (userExist) {
            throw new Error(AUTH_ERROR.USER_EXIST_USERNAME);
        }

        const passwordHash = await generalPasswordHash(password);

        let user = await prisma.user.create({
            data: {
                email,
                password: passwordHash,
                phoneNumber,
                username,
                fullname,
            },
        });

        if (!user) {
            throw new Error(AUTH_ERROR.USER_INPUT_FAILED);
        }

        // let balance = await getBalance(context);
        //
        // const expiredAt = new Date(
        //     setting?.timeTrial * 24 * 60 * 60 * 1000 + Date.now()
        // ).toISOString();

        const workspace = await prisma.workspace.create({
            data: {
                name: fullname,
                bucket: slugify(username),
                description: '',
                ownerId: user?.id,
                // balance,
                // expiredAt,
            },
        });

        const packageValue = await prisma.package.findFirst({
            where: {
                type: PackageType.Trial,
            },
        });

        console.log({ packageValue });

        const packageItem = await prisma.packageItem.findFirst({
            where: {
                packageParentId: packageValue.id as string,
            },
            include: {
                packagePeriod: true,
            },
        });

        console.log({ packageItem });

        const workspacePackage = await prisma.workspacePackage.create({
            data: {
                workspaceId: workspace?.id,
                packageItemId: packageItem?.id,
                numberWord: packageItem?.numberWord,
                freeTime: packageItem?.freeTime,
                time: packageItem?.packagePeriod?.time,
                isActive: true,
            },
        });

        console.log({ workspacePackage });

        await prisma.workspace.update({
            where: { id: workspace.id },
            data: { workspacePackageId: workspacePackage?.id },
        });

        const userUpdateWorkspace = prisma.user.update({
            where: { id: user.id },
            data: {
                workspaceId: workspace?.id,
            },
        });

        const createTeam = prisma.team.create({
            data: {
                name: username,
                ownerId: user.id,
                default: true,
                memberIds: [user.id],
                workspaceId: workspace?.id,
            },
        });

        const response = await prisma.$transaction([
            userUpdateWorkspace,
            createTeam,
        ]);

        const teamId = response[1].id;

        const projectDefault = await prisma.project.create({
            data: {
                teamId,
                workspaceId: workspace?.id,
                name: 'Default',
            },
        });

        const userUpdateTeamDefault = await prisma.user.update({
            where: { id: user.id },
            data: {
                defaultTeamId: teamId,
                defaultProjectId: projectDefault?.id,
            },
        });

        await prisma.emailSignup.deleteMany({
            where: { email },
        });

        await setSessionUser(req, userUpdateTeamDefault.id);

        return userUpdateTeamDefault;
    },
});

const SignupWithCodeInputType = inputObjectType({
    name: 'SignupWithCodeInputType',
    definition(t) {
        t.nullable.string('fullname');
        t.nonNull.string('username');
        t.nonNull.string('phoneNumber');
        t.nonNull.string('password');
        t.nonNull.string('code');
    },
});

export const SignupWithCodeMutation = mutationField('signUpWithCode', {
    type: nullable('User'),
    args: { input: arg({ type: SignupWithCodeInputType }) },
    async resolve(
        _,
        { input: { password, fullname, username, phoneNumber, code } },
        context
    ) {
        const { prisma, req } = context;

        const codeExist = await prisma.emailSignup.findFirst({
            where: { code },
        });

        if (!codeExist) {
            throw new Error(AUTH_ERROR.USER_INPUT_FAILED);
        }

        const email = codeExist.email;

        const userExist = await prisma.user.findFirst({
            where: {
                OR: [
                    {
                        email,
                    },
                    {
                        username,
                    },
                    {
                        phoneNumber,
                    },
                ],
            },
        });

        if (userExist) {
            throw new Error(AUTH_ERROR.USER_EXIST_USERNAME);
        }

        const passwordHash = await generalPasswordHash(password);

        try {
            return await prisma.$transaction(async (tx) => {
                // Code running in a transaction...

                let user = await prisma.user.create({
                    data: {
                        email,
                        password: passwordHash,
                        phoneNumber,
                        username,
                        fullname,
                    },
                });

                if (!user) {
                    throw new Error(AUTH_ERROR.USER_INPUT_FAILED);
                }

                // let balance = await getBalance(context);

                const workspace = await prisma.workspace.create({
                    data: {
                        name: fullname,
                        bucket: slugify(username),
                        // balance,
                        description: '',
                        ownerId: user?.id,
                    },
                });

                const packageValue = await prisma.package.findFirst({
                    where: {
                        type: PackageType.Trial,
                    },
                });

                console.log({ packageValue });

                if (!packageValue) {
                    throw new Error('Trial package not found');
                }

                const packageItem = await prisma.packageItem.findFirst({
                    where: {
                        packageParentId: packageValue.id as string,
                    },
                    include: {
                        packagePeriod: true,
                    },
                });

                if (!packageItem) {
                    throw new Error('Trial package item not found');
                }

                console.log({ packageItem });

                const workspacePackage = await prisma.workspacePackage.create({
                    data: {
                        workspaceId: workspace?.id,
                        packageItemId: packageItem.id,
                        numberWord: packageItem.numberWord,
                        freeTime: packageItem.freeTime,
                        time: packageItem.packagePeriod?.time || 0,
                        isActive: true,
                    },
                });

                const userUpdateWorkspace = prisma.user.update({
                    where: { id: user.id },
                    data: {
                        workspaceId: workspace?.id,
                    },
                });

                await prisma.workspace.update({
                    where: { id: workspace.id },
                    data: { workspacePackageId: workspacePackage?.id },
                });

                const createTeam = prisma.team.create({
                    data: {
                        name: username,
                        ownerId: user.id,
                        default: true,
                        memberIds: [user.id],
                        workspaceId: workspace?.id,
                    },
                });

                const response = await prisma.$transaction([
                    userUpdateWorkspace,
                    createTeam,
                ]);

                const teamId = response[1].id;

                const projectDefault = await prisma.project.create({
                    data: {
                        teamId,
                        workspaceId: workspace?.id,
                        name: 'Dự án mặc định',
                    },
                });

                const userUpdateTeamDefault = await prisma.user.update({
                    where: { id: user.id },
                    data: {
                        defaultTeamId: teamId,
                        defaultProjectId: projectDefault?.id,
                    },
                });

                await prisma.emailSignup.deleteMany({
                    where: { email, code },
                });

                await setSessionUser(req, userUpdateTeamDefault.id);

                return userUpdateTeamDefault;
            });
        } catch (err) {
            console.log({ err });
            // Handle the rollback...
        }
    },
});

export const SignupVerifyMutation1 = mutationField('signupVerify1', {
    type: 'Boolean',
    args: { email: nonNull(stringArg()) },
    async resolve(_, { email }, { prisma }) {
        try {
            console.log({ email });
            const checkEmailUser = prisma.user.findMany({ where: { email } });
            const checkEmailSignup = prisma.emailSignup.findMany({
                where: { email },
            });
            const response = await prisma.$transaction([
                checkEmailUser,
                checkEmailSignup,
            ]);

            console.log(response);

            if (response.some((i) => i.length > 0)) {
                throw new Error(AUTH_ERROR.USER_EXIST_EMAIL);
            }

            const token = generateToken({ data: email });
            const link = `${BASE_URL}/signup?t=${token}`;
            const content = templateEmail.signup(link);

            await sendEmail({
                toAddresses: [email],
                type: 'html',
                subject: 'Đăng ký tài khoản Copybox',
                content,
            });

            await prisma.emailSignup.create({
                data: { email },
            });

            return true;
        } catch (error) {
            console.log({ error });
            return false;
        }
    },
});

export const SignupVerifyMutation = mutationField('signupVerify', {
    type: 'Boolean',
    args: { email: nonNull(stringArg()) },
    async resolve(_, { email }, { prisma }) {
        try {
            console.log({ email });
            const checkEmailUser = prisma.user.findMany({ where: { email } });
            const checkEmailSignup = prisma.emailSignup.findMany({
                where: { email },
            });
            const response = await prisma.$transaction([
                checkEmailUser,
                checkEmailSignup,
            ]);

            let code = generateCode();

            async function getCodeVerify(value: string) {
                const total = await prisma.emailSignup.count({
                    where: { code: value },
                });

                console.log({ total });

                if (total === 0) {
                    return value;
                }

                const newCode = generateCode();

                return await getCodeVerify(newCode);
            }

            code = await getCodeVerify(code);

            if (response.some((i) => i.length > 0)) {
                throw new Error(AUTH_ERROR.USER_EXIST_EMAIL);
            }

            // const content = templateEmail.signup(code);

            await sendEmail({
                toAddresses: [email],
                type: 'html',
                // subject: "Test email",
                subject: 'Copybox',
                content: `<div>
                    <div><span style="color: #77767a"> Mã xác nhận đăng ký: </span></div>

                    <div style="padding-top: 10px">
                         <strong>
                            <span style="color:#000000;font-weight:700;font-size:30px;line-height:48px">
                              ${code}
                            </span>
                        </strong>
                    </div>
                </div>`,
            });

            await prisma.emailSignup.create({
                data: { email, code },
            });

            return true;
        } catch (error) {
            console.log({ error });
            return false;
        }
    },
});

const ForgotPasswordInputType = inputObjectType({
    name: 'ForgotPasswordInputType',
    definition(t) {
        t.string('email');
    },
});

export const ForgotPassword = mutationField('forgotPassword', {
    type: 'Boolean',
    args: { input: arg({ type: ForgotPasswordInputType }) },
    async resolve(_, { input: { email } }, { prisma }) {
        const userExistWithEmail = await prisma.user.findFirst({
            where: { email },
        });

        if (!userExistWithEmail) {
            throw new Error(AUTH_ERROR.USER_NOT_FOUND);
        }

        const code = generateCode();

        async function getCode(val: string) {
            const total = await prisma.code.count({
                where: { code: val, email },
            });

            if (total === 0) {
                await prisma.code.create({
                    data: { code, email },
                });

                return val;
            }

            const newCode = generateCode();

            return getCode(newCode);
        }

        const codeValue = await getCode(code);

        const value = `https://copybox.app/reset-password?code=${codeValue}`;
        const content = templateEmail.resetPassword(value);

        await sendEmail({
            toAddresses: [email],
            content,
            subject: 'Quên mật khẩu',
            type: 'html',
        });

        return true;
    },
});

const ResetPasswordInputType = inputObjectType({
    name: 'ResetPasswordInputType',
    definition(t) {
        t.string('code');
        t.string('password');
    },
});

export const ResetPassword = mutationField('resetPassword', {
    type: 'Boolean',
    args: { input: arg({ type: ResetPasswordInputType }) },
    async resolve(_, { input: { code, password } }, { prisma }) {
        const codeExist = await prisma.code.findFirst({
            where: { code },
        });

        if (!codeExist) {
            throw new Error(AUTH_ERROR.USER_INPUT_FAILED);
        }

        const passwordHash = await generalPasswordHash(password);

        const resetPassword = prisma.user.updateMany({
            where: { email: codeExist.email },
            data: { password: passwordHash },
        });

        const removeCode = prisma.code.delete({
            where: { id: codeExist.id },
        });

        await prisma.$transaction([resetPassword, removeCode]);

        return true;
    },
});

export const LogoutMutation = mutationField('logout', {
    type: 'Boolean',
    async resolve(_, __, { req }) {
        await setSessionUser(req, null);
        return true;
    },
});
