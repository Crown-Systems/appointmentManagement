import prisma from '../../app/lib/prisma';

export default async function handler(req, res) {
    // Extract year, month, and day from query parameters
    const { year, month, day } = req.query;

    // Parse the values to integers
    const parsedYear = parseInt(year, 10);
    const parsedMonth = parseInt(month, 10) - 1; // Adjust for zero-based index in JavaScript Date
    const parsedDay = parseInt(day, 10);

    // Check if the parsing was successful
    if (isNaN(parsedYear) || isNaN(parsedMonth) || isNaN(parsedDay)) {
        return res.status(400).json({ error: 'Invalid date parameters' });
    }

    // Define the start and end of the day for the query
    const startOfDay = new Date(parsedYear, parsedMonth, parsedDay, 0, 0, 0);
    const endOfDay = new Date(parsedYear, parsedMonth, parsedDay, 23, 59, 59);

    try {
        // Fetch all unavailability entries for the specified day
        const unavailabilities = await prisma.unavailability.findMany({
            where: {
                OR: [
                    {
                        start: {
                            gte: startOfDay,
                            lt: endOfDay,
                        },
                    },
                    {
                        end: {
                            gt: startOfDay,
                            lte: endOfDay,
                        },
                    },
                    {
                        start: {
                            lte: startOfDay,
                        },
                        end: {
                            gte: endOfDay,
                        },
                    },
                ],
            },
        });

        // Respond with the fetched unavailable slots
        res.status(200).json({ unavailableSlots: unavailabilities });
    } catch (error) {
        console.error('Error fetching unavailable slots:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
