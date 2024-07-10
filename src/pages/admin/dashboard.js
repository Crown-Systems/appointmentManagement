'use client'
import moment from 'moment';
import { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import LeftSidebar from '../../app/components/admin/leftSidebar/LeftSidebar';
import { customers, events } from '../../data/events';
import './dashboard.module.scss';

const localizer = momentLocalizer(moment)

const Dashboard = (props) => {
    const [selectedCustomer, setSelectedCustomer] = useState(null);

    const handleSelectCustomer = (customerId) => {
        setSelectedCustomer(customerId);
        // Implement logic to highlight schedule for selected customer
        // Example: fetch and display schedule for customerId
    };

    return (
        <div style={{ display: 'flex', height: '100vh' }}>
            <LeftSidebar onSelectCustomer={handleSelectCustomer} />
            <div style={{ flex: 1, padding: '20px' }}>
                <h1>Customer Dashboard</h1>
                {selectedCustomer && (
                    <div>
                        <h2>Schedule for {customers.find(c => c.id === selectedCustomer).name}</h2>
                        {/* Implement schedule display component or logic */}
                        <Calendar
                            localizer={localizer}
                            events={events}
                            startAccessor="start"
                            endAccessor="end"
                            style={{ height: 500 }}
                        />
                    </div>
                )}
            </div>
        </div>);
}

export default Dashboard