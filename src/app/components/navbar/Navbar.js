import Link from 'next/link';
import styles from './navbar.module.scss'; // Assuming you create a CSS module for styling

const NavBar = () => {
    return (
        <nav className={styles.nav}>
            <ul className={styles.navList}>
                <Link className={styles.navItem} href="/">Home</Link>
                <Link className={styles.navItem} href="/userProfile">User Profile</Link>
                <Link className={styles.navItem} href="/appointments">Appointments</Link>
                <Link className={styles.navItem} href="/settings">Settings</Link>
            </ul>
        </nav>
    );
};

export default NavBar;
