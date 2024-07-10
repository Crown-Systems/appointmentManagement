import { useState } from 'react';
import { customers } from '../../../../data/events'; // Import customers data from data/customers.js
import styles from './leftSidebar.module.scss'; // Example CSS module for styling

const LeftSidebar = ({ onSelectCustomer }) => {
    const [selectedCustomerId, setSelectedCustomerId] = useState(null);

    const handleCustomerClick = (customerId) => {
        setSelectedCustomerId(customerId);
        onSelectCustomer(customerId); // Notify parent component about selected customer
    };

    return (
        <div className={styles.sidebar}>
            <h2>Customers</h2>
            <ul className={styles.customerList}>
                {customers.map((customer) => (
                    <li
                        key={customer.id}
                        className={customer.id === selectedCustomerId ? styles.selected : ''}
                        onClick={() => handleCustomerClick(customer.id)}
                    >
                        <div>
                            <strong>{customer.name}</strong>
                        </div>
                        <div>{customer.contact}</div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default LeftSidebar;
