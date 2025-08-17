import prisma from '@lib/prisma';
import { sessionOptions } from '@lib/session';
import { serviceRedis } from '@share/helps/redis';
import { withIronSessionApiRoute } from 'iron-session/next';
import cors from 'micro-cors';

async function handler(req, res) {
    const response = await prisma.service.findMany({
        where: { isDelete: false },
    });

    const total = await prisma.service.count({
        where: { isDelete: false },
    });

    const services = await serviceRedis.getAllService();

    return res.json({ services });
}

export default withIronSessionApiRoute(cors()(handler), sessionOptions);
