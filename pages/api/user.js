import prisma from '../../app/lib/prisma';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { email } = req.body;

        try {
            const user = await prisma.user.create({
                data: { email },
            });
            res.status(201).json(user);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    } else if (req.method === 'GET') {
        try {
            const users = await prisma.user.findMany();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}
