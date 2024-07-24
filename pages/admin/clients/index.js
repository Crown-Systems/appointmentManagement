import { useState } from 'react';
import Layout from '../../../app/components/admin/layout/LayoutComponent';
import LeftSidebar from '../../../app/components/admin/leftSidebar/LeftSidebar';
import styles from './clients.module.scss';
function Clients() {
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const handleSelectCustomer = (customerId) => {
        setSelectedCustomer(customerId);
        // Implement logic to highlight schedule for selected customer
        // Example: fetch and display schedule for customerId
    };
    return (
        <Layout>
            <div className={styles.container}>
                <LeftSidebar onSelectCustomer={handleSelectCustomer} />
                <div className={styles.content}>
                    <h2>Clients</h2>
                    <div className={styles.clientList}>
                        <div className={styles.clients}>
                            <div className={styles.subHeading}>
                                <h1>Customer Dashboard</h1>
                                {selectedCustomer && (
                                    <h2>Schedule for {customers.find(c => c.id === selectedCustomer).name}</h2>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default Clients;
