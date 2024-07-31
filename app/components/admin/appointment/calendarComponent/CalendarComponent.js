'use client';

import moment from 'moment';
import { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import styles from './calendarComponent.module.scss';

const localizer = momentLocalizer(moment);

const CalendarComponent = ({ events }) => {
    const [allEvents, setAllEvents] = useState([]);

    useEffect(() => {
        setAllEvents(events);
    }, [events]);

    const handleSelectSlot = async ({ start, end }) => {
        const title = window.prompt('New Appointment Title');
        if (title) {
            const newAppointment = { title, start, end };
            const response = await fetch('/api/appointments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newAppointment),
            });
            const data = await response.json();
            setAllEvents(prevEvents => [...prevEvents, { ...data, type: 'appointment' }]);

            // Also add to unavailability
            const newUnavailability = { start, end, reason: title };
            await fetch('/api/unavailability', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newUnavailability),
            });
            setAllEvents(prevEvents => [...prevEvents, { ...newUnavailability, type: 'unavailability', title }]);
        }
    };

    const handleAdminSetUnavailability = async ({ start, end }) => {
        const reason = window.prompt('Reason for Unavailability');
        if (reason) {
            const newUnavailability = { start, end, reason };
            const response = await fetch('/api/unavailability', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newUnavailability),
            });
            const data = await response.json();
            setAllEvents(prevEvents => [...prevEvents, { ...data, type: 'unavailability' }]);
        }
    };

    return (
        <div className={styles.pageBody}>
            <button onClick={() => handleAdminSetUnavailability({ start: new Date(), end: new Date() })}>
                Set Unavailability
            </button>
            <Calendar
                localizer={localizer}
                events={allEvents}
                startAccessor="start"
                endAccessor="end"
                selectable
                onSelectSlot={handleSelectSlot}
                style={{ width: '100%', height: '100%' }}
            />
        </div>
    );
};

export default CalendarComponent;