import Link from 'next/link';
import styles from './page.module.css';

export default function HomePage() {
  return (
    <div className={styles.container}>
      <h1>Welcome to Your Dashboard</h1>
      <div className={styles.links}>
        <Link className={styles.link} href="/">
          Home
        </Link>
        <Link className={styles.link} href="/userProfile">
          User Profile
        </Link>
        <Link className={styles.link} href="/appointments">
          Appointments
        </Link>
        <Link className={styles.link} href="/settings">
          Settings
        </Link>
      </div>
    </div>
  );
}
