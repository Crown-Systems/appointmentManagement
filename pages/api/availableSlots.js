import prisma from '../../app/lib/prisma';


const Handler = async (req, res) => {
    const { date } = req.query;

    try {
        const availableSlots = await prisma.slot.findMany({
            where: {
                date: new Date(date),
                isAvailable: true,
            },
            select: {
                time: true,
            },
        });

        res.status(200).json({ slots: availableSlots.map(slot => slot.time) });
    } catch (error) {
        res.status(500).json({ error: 'Error fetching available slots' });
    }
};

export default Handler;