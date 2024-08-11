// src/app/calendarComponent/CalendarClient.js

'use client'; // This makes the component a client-side component

import { useRouter } from 'next/navigation';
import styles from './calendarClient.module.scss';
const CalendarClient = ({ currentMonth, currentYear, children }) => {
    const router = useRouter();

    const changeMonth = (direction) => {
        let newMonth = currentMonth + direction;
        let newYear = currentYear;

        if (newMonth < 0) {
            newMonth = 11;
            newYear -= 1;
        } else if (newMonth > 11) {
            newMonth = 0;
            newYear += 1;
        }

        // Update the URL with new month and year
        const url = `/calendarComponent?month=${newMonth}&year=${newYear}`;
        router.push(url);
    };

    return (
        <div className={styles.container}>
            <button onClick={() => changeMonth(-1)}>Previous</button>
            {children}
            <button onClick={() => changeMonth(1)}>Next</button>
        </div>
    );
};

export default CalendarClient;
