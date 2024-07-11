import moment from 'moment';
import { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { customers, events } from '../../../data/events';
import LeftSidebar from '../leftSidebar/LeftSidebar';
import styles from './appointments.module.scss';

const localizer = momentLocalizer(moment)

const Appointment = (props) => {
    const [selectedCustomer, setSelectedCustomer] = useState(null);

    const handleSelectCustomer = (customerId) => {
        setSelectedCustomer(customerId);
        // Implement logic to highlight schedule for selected customer
        // Example: fetch and display schedule for customerId
    };

    return (
        <div className={styles.container}>
            <LeftSidebar onSelectCustomer={handleSelectCustomer} />
            <div className={styles.pageBody}>
                <div className={styles.subHeading}>
                    <h1>Customer Dashboard</h1>
                    {selectedCustomer && (
                        <h2>Schedule for {customers.find(c => c.id === selectedCustomer).name}</h2>
                    )}
                </div>
                <Calendar
                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: 500, width: '100%' }}
                />
            </div>
        </div>
    )
}

export default Appointment;