import moment from 'moment';
import { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import BookingModal from '../bookingModal/BookingModal';
// import styles from './calendarComponent.scss';

const localizer = momentLocalizer(moment);

const CalendarComponent = ({ events, services, onAddEvent }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedSlot, setSelectedSlot] = useState(null);

    const handleSelectSlot = ({ start, end }) => {
        setSelectedSlot({ start, end });
        setIsModalOpen(true);
    };

    const handleAddEvent = (newEvent) => {
        onAddEvent({ ...selectedSlot, ...newEvent });
        setIsModalOpen(false);
    };

    const handleSelectEvent = (event) => {
        alert(event.title);
    };

    return (
        <div>
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                selectable
                onSelectSlot={handleSelectSlot}
                onSelectEvent={handleSelectEvent}
                style={{ height: 500 }}
            />
            <BookingModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onAddEvent={handleAddEvent}
                services={services}
            />
        </div>
    );
};

export default CalendarComponent;
