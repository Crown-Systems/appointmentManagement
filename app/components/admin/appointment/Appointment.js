import dynamic from 'next/dynamic';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import styles from './appointments.module.scss';

const CalendarComponent = dynamic(() => import('./calendarComponent/CalendarComponent'), {
    ssr: false, // This makes sure the component is only rendered on the client side
});

export async function getServerSideProps() {
    const appointments = await prisma.appointment.findMany();
    const unavailability = await prisma.unavailability.findMany();

    // Combine appointments and unavailability
    const events = [
        ...appointments.map(appointment => ({
            ...appointment,
            type: 'appointment',
            start: new Date(appointment.start),
            end: new Date(appointment.end),
        })),
        ...unavailability.map(unavailable => ({
            ...unavailable,
            title: unavailable.reason || 'Unavailable',
            type: 'unavailability',
            start: new Date(unavailable.start),
            end: new Date(unavailable.end),
        })),
    ];

    return {
        props: {
            initialEvents: events,
        },
    };
}

const Appointment = ({ initialEvents }) => {

    return (
        <div className={styles.container}>
            <CalendarComponent events={initialEvents} />
        </div>
    )
}

export default Appointment;