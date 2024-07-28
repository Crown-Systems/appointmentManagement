import { getSession, withPageAuthRequired } from '@auth0/nextjs-auth0';

export default withPageAuthRequired(async function middleware(req, res) {
    const session = getSession(req, res);

    if (session && session.user) {
        const userRoles = session.user['http://localhost:3000/roles'];

        if (!userRoles.includes('admin')) {
            return res.status(403).end('Forbidden');
        }
    }
});