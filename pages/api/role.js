import { ManagementClient } from 'auth0';

const getManagementClient = () => {
    return new ManagementClient({
        domain: process.env.AUTH0_DOMAIN,
        clientId: process.env.AUTH0_CLIENT_ID,
        clientSecret: process.env.AUTH0_CLIENT_SECRET,
        scope: 'read:users read:roles'
    });
};

export default async function handler(req, res) {
    const { userId } = req.query;

    if (!userId) {
        return res.status(400).json({ error: 'User ID is required' });
    }

    try {
        const client = getManagementClient();
        const roles = await client.getUserRoles({ id: userId });
        console.log(roles);
        res.status(200).json({ roles });

    } catch (error) {
        console.error('Error fetching user roles:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}