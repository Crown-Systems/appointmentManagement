import CalendarComponent from './CalendarComponent';

const CalendarContainer = ({ initialEvents, services }) => {
    const [events, setEvents] = useState(initialEvents.map(event => ({
        ...event,
        start: new Date(event.start),
        end: new Date(event.end),
    })));

    const handleAddEvent = (newEvent) => {
        setEvents([...events, newEvent]);
        // Ideally, you should also persist the new event to your database here.
    };

    return (
        <CalendarComponent
            events={events}
            services={services}
            onAddEvent={handleAddEvent}
        />
    );
};

export default CalendarContainer;
