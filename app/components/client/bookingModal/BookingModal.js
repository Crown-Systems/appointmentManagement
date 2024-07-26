// BookingModal.js
import { useState } from 'react';
import styles from './bookingModal.module.scss';

const BookingModal = ({ isOpen, onClose, onAddEvent, services }) => {
    const [title, setTitle] = useState('');
    const [service, setService] = useState('');

    const handleAddEvent = () => {
        if (title && service) {
            onAddEvent({ title, service });
            onClose();
        }
    };

    if (!isOpen) {
        return null;
    }

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modal}>
                <h2>New Booking</h2>
                <div className={styles.modalContent}>
                    <label>Service</label>
                    <select value={service} onChange={(e) => setService(e.target.value)}>
                        <option value="" disabled>Select a service</option>
                        {services.map((service) => (
                            <option key={service} value={service}>{service}</option>
                        ))}
                    </select>
                    <label>Service Name</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className={styles.modalActions}>
                    <button onClick={handleAddEvent}>Add Booking</button>
                    <button onClick={onClose}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default BookingModal;
