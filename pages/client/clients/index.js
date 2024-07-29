import { useState } from 'react';
import Layout from '../../../app/components/admin/layout/LayoutComponent';
import LeftSidebar from '../../../app/components/admin/leftSidebar/LeftSidebar';
import { customers } from '../../../app/data/events';
import styles from './clients.module.scss';
function Clients() {
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const handleSelectCustomer = (customerId) => {
        setSelectedCustomer(customerId);
        // Implement logic to fetch and display schedule for customerId
    };
    return (
        <Layout>
            <div className={styles.container}>
                <LeftSidebar onSelectCustomer={handleSelectCustomer} />
                <div className={styles.content}>
                    <h2>Client Profile</h2>
                    <div className={styles.clientList}>
                        <div className={styles.client}>
                            <div className={styles.subHeading}>
                                <h1>Details</h1>
                                {selectedCustomer && (
                                    <h2 className={styles.clientDetails}>Schedule for {customers.find(c => c.id === selectedCustomer).name}</h2>
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
