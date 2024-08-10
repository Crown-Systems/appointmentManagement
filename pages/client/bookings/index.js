// src/app/bookings/page.js
import dynamic from 'next/dynamic';
import prisma from '../../../app/lib/prisma';
import styles from './bookings.module.scss';

const ClientLayout = dynamic(() => import('../../../app/components/client/layoutClient/LayoutComponent'));

function BookingsPage({ bookings }) {
    const upcomingBookings = bookings.filter((booking) => booking.status === 'upcoming');
    const pastBookings = bookings.filter((booking) => booking.status === 'past');

    return (
        <ClientLayout>
            <div className={styles.bookingsContainer}>
                <h1>Bookings</h1>
                <section className={styles.bookingsSection}>
                    <h2>Upcoming Bookings</h2>
                    <ul>
                        {upcomingBookings.map((booking) => (
                            <li key={booking.id}>
                                <span>{booking.customerName}</span>
                                <span className="date">{new Date(booking.date).toLocaleDateString()}</span>
                            </li>
                        ))}
                    </ul>
                </section>
                <section className={styles.bookingsSection}>
                    <h2>Past Bookings</h2>
                    <ul>
                        {pastBookings.map((booking) => (
                            <li key={booking.id}>
                                <span>{booking.customerName}</span>
                                <span className="date">{new Date(booking.date).toLocaleDateString()}</span>
                            </li>
                        ))}
                    </ul>
                </section>
            </div>
        </ClientLayout >
    );
}

export async function getServerSideProps() {
    const bookings = await prisma.booking.findMany({
        orderBy: {
            date: 'desc',
        },
    });

    // Convert DateTime to ISO string
    const serializedBookings = bookings.map((booking) => ({
        ...booking,
        date: booking.date.toISOString(),
    }));

    return {
        props: {
            bookings: serializedBookings,
        },
    };
}

export default BookingsPage;
