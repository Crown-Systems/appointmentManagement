import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(req, res) {
    if (req.method === 'GET') {
        const unavailability = await prisma.unavailability.findMany();
        res.json(unavailability);
    } else if (req.method === 'POST') {
        const { start, end, reason } = req.body;
        const newUnavailability = await prisma.unavailability.create({
            data: { start, end, reason },
        });
        res.json(newUnavailability);
    }
}