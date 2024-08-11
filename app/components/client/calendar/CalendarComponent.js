'use client'; // Designate this as a client component

import moment from 'moment';
import { useEffect, useState } from 'react';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import styles from './calendarComponent.module.scss';

const CalendarComponent = () => {
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
    const [availableSlots, setAvailableSlots] = useState({});
    const [selectedDate, setSelectedDate] = useState(new Date().getDate());
    const [selectedSlot, setSelectedSlot] = useState(null);

    useEffect(() => {
        // Generate default available slots for the current month
        const defaultSlots = generateDefaultSlots(currentYear, currentMonth);
        setAvailableSlots(defaultSlots);

        // Fetch unavailable slots for the initially selected date
        fetchUnavailableSlots(currentYear, currentMonth, selectedDate);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentMonth, currentYear]);

    const generateDefaultSlots = (year, month) => {
        const defaultSlots = {};
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        for (let day = 1; day <= daysInMonth; day++) {
            defaultSlots[day] = [];
            for (let hour = 9; hour < 18; hour++) {
                const slotLabel = `${moment({ hour }).format('hh:00 A')} - ${moment({ hour: hour + 1 }).format('hh:00 A')}`;
                defaultSlots[day].push(slotLabel);
            }
        }
        return defaultSlots;
    };

    // Fetch unavailable slots for a specific date and update available slots
    const fetchUnavailableSlots = async (year, month, date) => {
        try {
            const response = await fetch(`/api/unavailableSlots?year=${year}&month=${month + 1}&day=${date}`);
            const data = await response.json();
            updateAvailableSlots(data.unavailableSlots, date);
        } catch (error) {
            console.error('Error fetching unavailable slots:', error);
        }
    };

    const updateAvailableSlots = (unavailableSlots, day) => {
        const updatedSlots = { ...availableSlots };

        unavailableSlots.forEach(unavailability => {
            const startDate = new Date(unavailability.start);
            const endDate = new Date(unavailability.end);

            updatedSlots[day] = updatedSlots[day].filter(slot => {
                const [start, end] = slot.split(' - ').map(t => {
                    const [hour, minute] = t.split(':');
                    const isPM = t.includes('PM');
                    const adjustedHour = isPM && hour !== '12' ? parseInt(hour, 10) + 12 : parseInt(hour, 10);
                    return moment().set({ hour: adjustedHour, minute: parseInt(minute, 10), second: 0 }).toDate();
                });

                return endDate <= start || startDate >= end;
            });
        });

        setAvailableSlots(updatedSlots);
    };

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

        setCurrentMonth(newMonth);
        setCurrentYear(newYear);
        setSelectedDate(1);
        setSelectedSlot(null);
    };

    const selectDateHandler = async (day) => {
        setSelectedDate(day);
        setSelectedSlot(null);

        await fetchUnavailableSlots(currentYear, currentMonth, day);
    };

    const selectSlotHandler = (slot) => {
        setSelectedSlot(slot);
    };

    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    return (
        <div className={styles.container}>
            <h1>Book Appointment</h1>
            <div className={styles.booking}>
                <div className={styles.calendar}>
                    <div className={styles.calendarHeader}>
                        <button onClick={() => changeMonth(-1)}>Previous</button>
                        <span>{moment().year(currentYear).month(currentMonth).format('MMMM YYYY')}</span>
                        <button onClick={() => changeMonth(1)}>Next</button>
                    </div>
                    <div className={styles.dates}>
                        {[...Array(daysInMonth)].map((_, index) => {
                            const day = index + 1;
                            const isSelected = day === selectedDate;
                            const isAvailable = availableSlots[day] && availableSlots[day].length > 0;

                            return (
                                <div
                                    key={day}
                                    className={`${styles.date} ${isAvailable ? styles.availableDate : ''} ${isSelected ? styles.selectedDate : ''}`}
                                    onClick={() => selectDateHandler(day)}
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
                        {availableSlots[selectedDate]?.map((slot, index) => (
                            <div
                                key={index}
                                className={`${styles.slot} ${slot === selectedSlot ? styles.selectedSlot : ''}`}
                                onClick={() => selectSlotHandler(slot)}
                            >
                                {slot}
                            </div>
                        ))}
                    </div>
                    <button className={styles.continueButton} disabled={!selectedSlot}>Continue</button>
                    <p className={styles.reschedulingNotice}>
                        Rescheduling charges may apply.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CalendarComponent;
