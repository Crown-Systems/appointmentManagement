import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './navbarClient.module.scss';

const NavBar = () => {
    const path = usePathname();
    return (
        <nav className={`${styles.flexContainer} ${styles.spaceX6}`}>
            <div className={styles.sidebar}>
                <Link className={styles.sidebarLink} href="/client">
                    <svg className="w-8 h-8 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z" />
                    </svg>
                </Link>
                <div className={styles.sidebarSections}>
                    <Link className={`${styles.sectionLink} ${path == "/client/appointments" && styles.highlight}`} href="/admin/appointments">
                        <Image src="/icons/calendarIcon.png" alt="calendar" width={24} height={24} />
                    </Link>
                    <Link className={`${styles.sectionLink} ${path == "/client/services" && styles.highlight}`} href="/admin/clients">
                        <Image src="/icons/serviceIcon.png" alt="services" width={24} height={24} />
                    </Link>
                    <Link className={`${styles.sectionLink} ${path == "/client/user" && styles.highlight}`} href="/admin/user">
                        <Image src="/icons/userIcon.png" alt="user" width={24} height={24} />
                    </Link>
                    <Link className={`${styles.sectionLink} ${path == "/client/settings" && styles.highlight}`} href="/admin/settings">
                        <Image src="/icons/settingsIcon.png" alt="settings" width={24} height={24} />
                    </Link>
                </div>
            </div>
            <div className={styles.burgerButton} id="burgerButton">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </nav>
    );
};

export default NavBar;
