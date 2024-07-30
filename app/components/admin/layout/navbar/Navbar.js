import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './navbar.module.scss';

const NavBar = () => {
    const path = usePathname();
    return (
        <nav className={styles.flexContainer}>
            <div className={styles.sidebar}>
                <Link className={styles.sidebarLink} href="/">
                    <Image src="/icons/crownLogo.jpg" alt="Crown Logo" width={24} height={24} />
                </Link>
                <div className={styles.sidebarSections}>
                    <Link className={`${styles.sectionLink} ${path == "/admin/appointments" && styles.highlight}`} href="/admin/appointments">
                        <Image src="/icons/calendarIcon.png" alt="Calendar Icon" width={24} height={24} />
                        Appointments
                    </Link>
                    <Link className={`${styles.sectionLink} ${path == "/admin/clients" && styles.highlight}`} href="/admin/clients">
                        <Image src="/icons/userIcon.png" alt="Clients Icon" width={24} height={24} />
                        Clients
                    </Link>
                    <Link className={`${styles.sectionLink} ${path == "/admin/user" && styles.highlight}`} href="/admin/user">
                        <Image src="/icons/userIcon.png" alt="Clients Icon" width={24} height={24} />
                        User
                    </Link>
                    <Link className={`${styles.sectionLink} ${path == "/admin/settings" && styles.highlight}`} href="/admin/settings">
                        <Image src="/icons/settingsIcon.png" alt="Settings Icon" width={24} height={24} />
                        Settings
                    </Link>
                </div>
                <div className={styles.sidebarFooter}>
                    <Image src="/icons/crownLogo.jpg" alt="Crown Logo" width={24} height={24} />
                    <span>Crown Appointments</span>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
