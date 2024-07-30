import moment from 'moment';
import { momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { events } from '../../../data/events';
import styles from './appointments.module.scss';

import dynamic from 'next/dynamic';

const CalendarComponent = dynamic(() => import('./calendarComponent/CalendarComponent'), {
    ssr: false, // This makes sure the component is only rendered on the client side
});
const localizer = momentLocalizer(moment)

const Appointment = () => {

    return (
        <div className={styles.container}>
            <CalendarComponent events={events} />
        </div>
    )
}

export default Appointment;