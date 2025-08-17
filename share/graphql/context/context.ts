import prisma from '@lib/prisma';
import { Context } from './type.context';

export async function createContext({ req }): Promise<Partial<Context>> {
    const context: Context = {
        prisma,
        req,
    };

    const settings = await prisma.setting.findMany({});

    if (settings.length > 0) {
        context.setting = settings[0];
    }

    const userId = req.session.userId;

    if (userId) {
        let user = await prisma.user.findUnique({
            where: {
                id: userId,
            },
        });

        context.user = user;

        const workspace = await prisma.workspace.findFirst({
            where: { id: user?.workspaceId },
        });

        context.workspace = workspace;

        if (!user?.defaultTeamId) {
            if (user?.defaultProjectId) {
                user = await prisma.user.update({
                    where: {
                        id: userId,
                    },
                    data: {
                        defaultProjectId: null,
                    },
                });

                context.user = user;
            }

            context.team = null;
        } else {
            const team = await prisma.team.findFirst({
                where: {
                    id: user.defaultTeamId,
                },
            });

            context.team = team;
        }

        if (user?.defaultProjectId) {
            const project = await prisma.project.findFirst({
                where: {
                    id: user?.defaultProjectId,
                },
            });

            context.project = project;
        }
    }

    return context;
}
