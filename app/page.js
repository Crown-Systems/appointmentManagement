import Link from 'next/link';
import Layout from './components/admin/layout/Layout';
import styles from './page.module.css';
export default function HomePage() {
  const metadata = {
    title: 'Dashboard',
    description: 'Your dashboard page',
  };
  return (
    <Layout metadata={metadata}>
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
    </Layout>
  );
}
