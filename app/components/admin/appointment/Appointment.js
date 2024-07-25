import moment from 'moment';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { events } from '../../../data/events';
import styles from './appointments.module.scss';

const localizer = momentLocalizer(moment)

const Appointment = () => {

    return (
        <div className={styles.container}>
            <div className={styles.pageBody}>
                <Calendar
                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ width: '100%', height: '100%' }}
                />
            </div>
        </div>
    )
}

export default Appointment;