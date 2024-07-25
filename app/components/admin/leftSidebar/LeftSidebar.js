import { useState } from 'react';
import { customers } from '../../../data/events'; // Import customers data from data/customers.js
import styles from './leftSidebar.module.scss'; // Example CSS module for styling

const LeftSidebar = ({ onSelectCustomer }) => {
    const [selectedCustomerId, setSelectedCustomerId] = useState(null);

    const handleCustomerClick = (customerId) => {
        setSelectedCustomerId(customerId);
        onSelectCustomer(customerId); // Notify parent component about selected customer
    };

    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredCustomers = customers.filter((customer) =>
        customer.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className={styles.sidebar}>
            <h2>Customers</h2>
            <input
                className={styles.searchInput}
                type="text"
                placeholder="Search by name"
                value={searchTerm}
                onChange={handleSearch}
            />
            <ul className={styles.customerList}>
                {filteredCustomers.map((customer) => (
                    <li
                        key={customer.id}
                        className={customer.id === selectedCustomerId ? styles.selected : ''}
                        onClick={() => handleCustomerClick(customer.id)}
                    >

                        <strong>{customer.name}</strong>
                        <div className={styles.contact}>{customer.contact}</div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default LeftSidebar;
