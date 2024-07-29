import { getSession } from '@auth0/nextjs-auth0';
import dynamic from 'next/dynamic';

const ClientLayout = dynamic(() => import('../../app/components/client/layoutClient/LayoutComponent'));
const CalendarContainer = dynamic(() => import('../../app/components/client/calendar/CalendarComponent'));

const Client = ({ user, role, initialEvents, services }) => {
    return (
        <ClientLayout>
            <h1>Welcome to ...Crown Appointments...</h1>
            {user ? <p>Welcome, {user}! as {role}</p> : <p>Loading...</p>}
            <CalendarContainer initialEvents={initialEvents} services={services} />
        </ClientLayout>
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

    // Fetch events and services from your database here
    const initialEvents = [
        {
            title: 'Existing Booking',
            start: new Date().toISOString(),
            end: new Date().toISOString(),
        },
    ];

    const services = ['Grooming', 'Veterinary Checkup', 'Swimming'];
    return {
        props: {
            user: session.user.nickname,
            role: session.user["http://localhost:3000/roles"][0],
            initialEvents,
            services,
        },
    };
};

export default Client;