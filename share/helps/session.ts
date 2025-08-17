import { NextApiRequest } from 'next';

export async function setSessionUser(req: NextApiRequest, userId?: string) {
    req.session.userId = userId;
    await req.session.save();
}
