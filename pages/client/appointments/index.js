import dynamic from 'next/dynamic';
import { useState } from 'react';
import styles from './appointmentClient.module.scss';

const ClientLayout = dynamic(() => import('../../../app/components/client/layoutClient/LayoutComponent'));
const CalendarContainer = dynamic(() => import('../../../app/components/client/calendar/CalendarComponent'));

function Clients({ initialEvents, services }) {
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const handleSelectCustomer = (customerId) => {
        setSelectedCustomer(customerId);
        // Implement logic to fetch and display schedule for customerId
    };
    return (
        <ClientLayout>
            <div className={styles.container}>
                <CalendarContainer initialEvents={initialEvents} services={services} />
            </div>
        </ClientLayout>
    );
}

export default Clients;
