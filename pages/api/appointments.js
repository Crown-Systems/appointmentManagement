import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
    if (req.method === 'GET') {
        const appointments = await prisma.appointment.findMany();
        res.json(appointments);
    } else if (req.method === 'POST') {
        const { title, start, end } = req.body;
        const newAppointment = await prisma.appointment.create({
            data: { title, start, end },
        });
        res.json(newAppointment);
    }
}
