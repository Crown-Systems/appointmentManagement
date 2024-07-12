import Link from 'next/link';
import Layout from './components/admin/layout/LayoutComponent';
import styles from './page.module.scss';
export default function HomePage() {

  return (
    <Layout>
      <div className={styles.container}>
        <h1>Welcome to Appointment Management Dashboard</h1>
        <div className={styles.links}>
          <Link className={styles.link} href="/">
            Home
          </Link>
          <Link className={styles.link} href="/user">
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
