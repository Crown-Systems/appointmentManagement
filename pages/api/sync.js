import prisma from '../app/lib/prisma';

export default async function handler(req, res) {
    try {
        // Example operation: find all users
        const users = await prisma.user.findMany();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}