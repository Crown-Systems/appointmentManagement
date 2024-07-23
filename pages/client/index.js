import { getSession } from '@auth0/nextjs-auth0';

const client = ({ user }) => {
    return (
        <div>
            <h1>Dashboard</h1>
            {user ? <p>Welcome, {user.role}!</p> : <p>Loading...</p>}
            {/* Add more dashboard components here */}
        </div>
    );
};

export const getServerSideProps = async (context) => {
    const session = await getSession(context.req, context.res);

    if (!session) {
        return {
            redirect: {
                destination: process.env.LOGIN_URL,
                permanent: false,
            },
        };
    }

    return {
        props: {
            user: session.user,
        },
    };
};

export default client;
