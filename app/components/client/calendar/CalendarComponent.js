// src/app/calendarComponent/page.js

import moment from 'moment';
import { momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import prisma from '../../../../app/lib/prisma'; // Ensure this is set up to access your database
import CalendarClient from './CalendarClient'; // Client component for interactivity
import styles from './calendarComponent.module.scss';

const localizer = momentLocalizer(moment);

export const metadata = {
    title: 'Calendar Page',
    description: 'Calendar to book appointments',
};

const CalendarComponent = ({ searchParams = {} }) => {
    // Extract month and year from searchParams
    const currentMonth = searchParams.month ? parseInt(searchParams.month, 10) : new Date().getMonth();
    const currentYear = searchParams.year ? parseInt(searchParams.year, 10) : new Date().getFullYear();

    // Fetch available slots for the current month and year
    const availableSlots = getAvailableSlots(currentYear, currentMonth);
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    console.log('Available Slots:', availableSlots);

    return (
        <div className={styles.container}>
            <h1>Book Appointment</h1>
            <div className={styles.booking}>
                <div className={styles.calendar}>
                    <CalendarClient currentMonth={currentMonth} currentYear={currentYear} />
                    <div className={styles.calendarHeader}>
                        <span>{moment().year(currentYear).month(currentMonth).format('MMMM YYYY')}</span>
                    </div>
                    <div className={styles.dates}>
                        {[...Array(daysInMonth)].map((_, index) => {
                            const day = index + 1; // Day of the month
                            const isSelected = availableSlots[day] && availableSlots[day].length > 0;

                            return (
                                <div
                                    key={day}
                                    className={`${styles.date} ${isSelected ? styles.selectedDate : ''}`}
                                >
                                    {day}
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className={styles.slots}>
                    <h2>Choose Slot</h2>
                    <div className={styles.slotGrid}>
                        {availableSlots[new Date().getDate()]?.map((slot, index) => (
                            <div key={index} className={styles.slot}>
                                {slot}
                            </div>
                        ))}
                    </div>
                    <button className={styles.continueButton}>CONTINUE</button>
                    <p className={styles.reschedulingNotice}>
                        Rescheduling charges may apply.
                    </p>
                </div>
            </div>
        </div>
    );
};

// Modify the function to accept year and month
async function getAvailableSlots(year, month) {
    const endOfMonth = new Date(year, month + 1, 0);

    try {
        // Fetch all unavailability entries for the current month
        const unavailabilities = await prisma.unavailability.findMany({
            where: {
                start: {
                    gte: new Date(year, month, 1),
                    lt: endOfMonth,
                },
            },
        });

        // Check and create available slots
        const availableSlots = {};
        for (let day = 1; day <= endOfMonth.getDate(); day++) {
            availableSlots[day] = [];
            const currentDate = new Date(year, month, day);
            for (let hour = 9; hour < 18; hour++) {
                const slotStart = new Date(currentDate);
                slotStart.setHours(hour, 0, 0, 0);
                const slotEnd = new Date(slotStart);
                slotEnd.setHours(hour + 1, 0, 0, 0);

                if (!unavailabilities.some((u) => slotStart < u.end && slotEnd > u.start)) {
                    const slotLabel = `${slotStart.toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                    })} - ${slotEnd.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
                    availableSlots[day].push(slotLabel);
                }
            }
        }

        console.log('Available Slots:', availableSlots);
        return availableSlots; // Directly return the slots
    } catch (error) {
        console.error('Error fetching available slots:', error);
        return {}; // Return an empty object in case of an error
    }
}

export default CalendarComponent;
