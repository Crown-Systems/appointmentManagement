import { getSession } from '@auth0/nextjs-auth0';
import dynamic from 'next/dynamic';
import prisma from '../../app/lib/prisma';
import styles from './clientHome.module.scss';

const ClientLayout = dynamic(() => import('../../app/components/client/layoutClient/LayoutComponent'));

const Client = ({ user, role, services }) => {
    return (
        <ClientLayout>
            <div className={styles.container}>
                <header className={styles.header}>
                    <h1>Welcome to Crown Appointments</h1>
                    {user ? <p className={styles.welcome}>Welcome, {user}! You are logged in as {role}.</p> : <p>Loading...</p>}
                </header>
                <main className={styles.mainContent}>
                    <section className={styles.servicesSection}>
                        <h2>Our Services</h2>
                        <ul className={styles.servicesList}>
                            {services.map((service, index) => (
                                <li key={index} className={styles.serviceItem}>{service}</li>
                            ))}
                        </ul>
                    </section>
                    <section className={styles.eventsSection}>
                        <h2>Your Bookings</h2>
                        {/* Display initial events or a calendar component */}
                    </section>
                </main>
                <footer className={styles.footer}>
                    <p>© 2024 Crown Appointments. All rights reserved.</p>
                </footer>
            </div>
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

    const user = session.user;

    // Check if user exists in the database
    let dbUser = await prisma.user.findUnique({
        where: {
            email: user.email,
        },
    });

    // If user does not exist, create them
    if (!dbUser) {
        dbUser = await prisma.user.create({
            data: {
                email: user.email,
                name: user.name,
                password: user.sub, // Use the user's Auth0 ID as the password
                roles: user["http://localhost:3000/roles"][0] || null,
            },
        });
    }
    const userRole = user["http://localhost:3000/roles"][0] || null;

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
            user: dbUser.name,
            role: userRole,
            initialEvents,
            services,
        },
    };
};

export default Client;