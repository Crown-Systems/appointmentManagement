import Image from 'next/image';
import Link from 'next/link';
import styles from './topNav.module.scss';

const TopNav = () => {
    return (
        <nav className={styles.flexContainer}>
            <div className={styles.topBar}>
                <div className={styles.topBarSearch}>
                    <form action="/api/search" method="POST" role="search">
                        <input className={styles.search} type="search" placeholder="Search..." autoFocus required />
                        <button type="submit">GO</button>
                    </form>
                </div>
                <div className={styles.topBarSide}>
                    <Link className={styles.sectionLink} href="/admin/appointments">
                        <Image src="/icons/calendarIcon.png" alt="Calendar Icon" width={24} height={24} />
                    </Link>
                    <Link className={styles.sectionLink} href="/admin/clients">
                        <Image src="/icons/userIcon.png" alt="Clients Icon" width={24} height={24} />
                    </Link>
                    <Link className={styles.sectionLink} href="/admin/settings">
                        <Image src="/icons/settingsIcon.png" alt="Settings Icon" width={24} height={24} />
                    </Link>
                    <Link className={styles.sectionLink} href={process.env.NEXT_PUBLIC_LOGOUT_URL}>
                        <Image src="/icons/logoutIcon.png" alt="Logout Icon" width={24} height={24} />
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default TopNav;
