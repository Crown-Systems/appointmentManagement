import dynamic from 'next/dynamic';
import styles from './appointmentClient.module.scss';

const ClientLayout = dynamic(() => import('../../../app/components/client/layoutClient/LayoutComponent'));
const CalendarComponent = dynamic(() => import('../../../app/components/client/calendar/CalendarComponent'));

function Clients({ initialEvents, services }) {

    return (
        <ClientLayout>
            <div className={styles.container}>
                <CalendarComponent initialEvents={initialEvents} services={services} />
            </div>
        </ClientLayout>
    );
}

export default Clients;
