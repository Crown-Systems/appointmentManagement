import moment from 'moment';
import { useEffect, useState } from 'react';
import { momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import styles from './calendarComponent.module.scss';

const localizer = momentLocalizer(moment);

const CalendarComponent = ({ events, services, onAddEvent }) => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [availableSlots, setAvailableSlots] = useState([]);
    const [selectedSlot, setSelectedSlot] = useState(null);

    useEffect(() => {
        const fetchAvailableSlots = async () => {
            const response = await fetch(`/api/availableSlots?date=${selectedDate.toISOString()}`);
            const data = await response.json();
            setAvailableSlots(data.slots);
        };

        fetchAvailableSlots();
    }, [selectedDate]);

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const handleSlotChange = (slot) => {
        setSelectedSlot(slot);
    };

    return (
        <div className={styles.container}>
            <h1>Book Appointment</h1>
            <div className={styles.booking}>
                <div className={styles.calendar}>
                    <div className={styles.calendarHeader}>
                        <span>JULY 2023</span>
                    </div>
                    <div className={styles.dates}>
                        {[...Array(31)].map((_, index) => (
                            <div
                                key={index}
                                className={`${styles.date} ${selectedDate.getDate() === index + 1 ? styles.selectedDate : ''}`}
                                onClick={() => handleDateChange(new Date(2023, 6, index + 1))}
                            >
                                {index + 1}
                            </div>
                        ))}
                    </div>
                </div>
                <div className={styles.slots}>
                    <h2>Choose Slot</h2>
                    <div className={styles.slotGrid}>
                        {availableSlots?.map((slot, index) => (
                            <div
                                key={index}
                                className={`${styles.slot} ${selectedSlot === slot ? styles.selectedSlot : ''}`}
                                onClick={() => handleSlotChange(slot)}
                            >
                                {slot}
                            </div>
                        ))}
                    </div>
                    <button className={styles.continueButton}>CONTINUE</button>
                    <p className={styles.reschedulingNotice}>Rescheduling charges may apply.</p>
                </div>
            </div>
        </div>
    );
};

export default CalendarComponent;
