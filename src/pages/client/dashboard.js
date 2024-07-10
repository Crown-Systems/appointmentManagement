import { getSession } from '@auth0/nextjs-auth0';
import { useState } from 'react';

const DashboardPage = ({ user }) => {
    const [clients, setClients] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    return (
        <div>
            <h1>Dashboard</h1>
            <p>Welcome, {user?.name}!</p>
            {/* Add more dashboard components here */}
        </div>
    );
};

export async function getServerSideProps(context) {
    const { user } = getSession(context.req, context.res);

    return {
        props: {
            user: user || null,
        },
    };
}

export default DashboardPage;
