import Image from 'next/image';
import Link from 'next/link';
import styles from './topNavClient.module.scss';

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
                    <button >
                        <Image src="/icons/notificationsIcon.png" alt="notifications" width={24} height={24} />
                    </button>
                    <Link className={styles.sectionLink} href="/client/settings">
                        <Image src="/icons/settingsIcon.png" alt="settings" width={24} height={24} />
                    </Link>
                    <Link className={styles.sectionLink} href={process.env.NEXT_PUBLIC_LOGOUT_URL}>
                        <Image src="/icons/logoutIcon.png" alt="logout" width={24} height={24} />
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default TopNav;
