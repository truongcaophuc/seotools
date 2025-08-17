import {
    PrismaClient,
    Project,
    Setting,
    Team,
    User,
    Workspace,
} from '@prisma/client';
import { NextApiRequest } from 'next';

export type Context = {
    //   req: MicroRequest | NextIncomingMessage;
    req: NextApiRequest;
    prisma: PrismaClient;
    setting?: Setting;
    workspace?: Workspace;
    user?: User;
    team?: Team;
    project?: Project;
};
