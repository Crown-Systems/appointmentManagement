'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import styles from './navbarClient.module.scss';

const NavBarClient = () => {
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();
    const path = router.pathname;

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const closeSidebar = () => {
        setIsOpen(false);
    };

    return (
        <nav className={styles.flexContainer}>
            <div className={styles.burgerButton} onClick={toggleSidebar}>
                <Image src="/icons/burgerIcon.png" alt="burger" width={24} height={24} />
            </div>
            <div className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
                <Link className={styles.sidebarLink} href="/client">
                    <Image src="/icons/crownLogo.jpg" alt="crown-logo" width={24} height={24} />
                </Link>
                <div className={styles.sidebarSections}>
                    <Link className={`${styles.sectionLink} ${path == "/client/appointments" && styles.highlight}`} href="/client/appointments">
                        <Image src="/icons/calendarIcon.png" alt="calendar" width={24} height={24} />
                    </Link>
                    <Link className={`${styles.sectionLink} ${path == "/client/services" && styles.highlight}`} href="/client/services">
                        <Image src="/icons/serviceIcon.png" alt="services" width={24} height={24} />
                    </Link>
                    <Link className={`${styles.sectionLink} ${path == "/client/user" && styles.highlight}`} href="/client/user">
                        <Image src="/icons/userIcon.png" alt="user" width={24} height={24} />
                    </Link>
                    <Link className={`${styles.sectionLink} ${path == "/client/settings" && styles.highlight}`} href="/client/settings">
                        <Image src="/icons/settingsIcon.png" alt="settings" width={24} height={24} />
                    </Link>
                </div>
            </div>
            <div className={`${styles.backdrop} ${isOpen ? styles.visible : ''}`} onClick={closeSidebar}></div>
        </nav>
    );
};

export default NavBarClient;