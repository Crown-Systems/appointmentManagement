import Layout from '../../app/components/admin/layout/LayoutComponent';
import styles from './adminHome.module.scss';
export default function adminHomePage() {

  return (
    <Layout>
      <div className={styles.mainContainer}>
        {/* <nav>
            <div className={styles.search}>
              <input type="text" placeholder="Search" />
              <button>Search</button>
            </div>
            <div className={styles.links}>
              <Link className={styles.link} href="/">
                Home
              </Link>
              <Link className={styles.link} href="/user">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="24" height="24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 11c2.21 0 4-1.79 4-4S14.21 3 12 3 8 4.79 8 7s1.79 4 4 4zM4 21v-2c0-2.21 3.58-4 8-4s8 1.79 8 4v2H4z" />
                </svg>
              </Link>
              <Link className={styles.link} href="/appointments">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="#000000"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="notification-icon"
                >
                  <path d="m13.58 11.6-1.33-2.18V6.33A4.36 4.36 0 0 0 10 2.26a2.45 2.45 0 0 0 0-.38A1.94 1.94 0 0 0 8 0a1.94 1.94 0 0 0-2 1.88 1.64 1.64 0 0 0 0 .38 4.36 4.36 0 0 0-2.25 4.07v3.09L2.42 11.6a1.25 1.25 0 0 0 1.06 1.9h1.77A2.68 2.68 0 0 0 8 16a2.68 2.68 0 0 0 2.75-2.5h1.77a1.25 1.25 0 0 0 1.06-1.9zM7.25 1.88A.7.7 0 0 1 8 1.25a.7.7 0 0 1 .75.63 6 6 0 0 0-.75 0 5.9 5.9 0 0 0-.75 0zM8 14.75a1.44 1.44 0 0 1-1.5-1.25h3A1.44 1.44 0 0 1 8 14.75zm-4.52-2.5 1.34-2.17.18-.31V6.33a4 4 0 0 1 .6-2.12A2.68 2.68 0 0 1 8 3.12a2.68 2.68 0 0 1 2.4 1.09 4 4 0 0 1 .6 2.12v3.44l.18.31 1.34 2.17z" />
                </svg>
              </Link>
              <Link className={styles.link} href="/settings">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" enable-background="new 0 0 50 50">
                  <path fill="#494c4e" d="M27.7 44h-5.4l-1.5-4.6c-1-.3-2-.7-2.9-1.2l-4.4 2.2-3.8-3.8 2.2-4.4c-.5-.9-.9-1.9-1.2-2.9L6 27.7v-5.4l4.6-1.5c.3-1 .7-2 1.2-2.9l-2.2-4.4 3.8-3.8 4.4 2.2c.9-.5 1.9-.9 2.9-1.2L22.3 6h5.4l1.5 4.6c1 .3 2 .7 2.9 1.2l4.4-2.2 3.8 3.8-2.2 4.4c.5.9.9 1.9 1.2 2.9l4.6 1.5v5.4l-4.6 1.5c-.3 1-.7 2-1.2 2.9l2.2 4.4-3.8 3.8-4.4-2.2c-.9.5-1.9.9-2.9 1.2L27.7 44zm-4-2h2.6l1.4-4.3.5-.1c1.2-.3 2.3-.8 3.4-1.4l.5-.3 4 2 1.8-1.8-2-4 .3-.5c.6-1 1.1-2.2 1.4-3.4l.1-.5 4.3-1.4v-2.6l-4.3-1.4-.1-.5c-.3-1.2-.8-2.3-1.4-3.4l-.3-.5 2-4-1.8-1.8-4 2-.5-.3c-1.1-.6-2.2-1.1-3.4-1.4l-.5-.1L26.3 8h-2.6l-1.4 4.3-.5.1c-1.2.3-2.3.8-3.4 1.4l-.5.3-4-2-1.8 1.8 2 4-.3.5c-.6 1-1.1 2.2-1.4 3.4l-.1.5L8 23.7v2.6l4.3 1.4.1.5c.3 1.2.8 2.3 1.4 3.4l.3.5-2 4 1.8 1.8 4-2 .5.3c1.1.6 2.2 1.1 3.4 1.4l.5.1 1.4 4.3z" />
                  <path fill="#494c4e" d="M25 34c-5 0-9-4-9-9s4-9 9-9 9 4 9 9-4 9-9 9zm0-16c-3.9 0-7 3.1-7 7s3.1 7 7 7 7-3.1 7-7-3.1-7-7-7z" />
                </svg>
              </Link>
            </div>
          </nav> */}
        <div className={styles.bodyContainer}>
          <container className={styles.main}>
            <h1>Dashboard</h1>
            <section className={styles.home}>
              <div className={styles.card}>
                <h1>Requests</h1>
                <p>
                  This is the home page. You can see the user profile, appointments,
                  and settings pages.
                </p>
              </div>
              <div className={styles.card}>
                <h1>Confirmed</h1>
                <p>
                  This is the home page. You can see the user profile, appointments,
                  and settings pages.
                </p>
              </div>
              <div className={styles.card}>
                <h1>Today&rsquo;s</h1>
                <p>
                  This is the home page. You can see the user profile, appointments,
                  and settings pages.
                </p>
              </div>
              <div className={styles.card}>
                <h1>Tomorrow&rsquo;s</h1>
                <p>
                  This is the home page. You can see the user profile, appointments,
                  and settings pages.
                </p>
              </div>
            </section>
            <section className={styles.summary}>
              <h1>Summary</h1>
              <p>
                This is the summary section. You can see the user profile, appointments,
              </p>
            </section>
          </container>
          <container className={styles.side}>
            <h1>Insights</h1>
            <section className={styles.sidebar}>
              <h1>Overdue appointments</h1>
              <p>
                Customer "ABC" appointments that are overdue. For rescheduling.please contact the customer & set it up in the appointment section.
              </p>
              <p>
                Customer "XYZ" appointments that are overdue. For rescheduling.please contact the customer & set it up in the appointment section.
              </p>
              <p>
                Customer "ASD" appointments that are overdue. For rescheduling.please contact the customer & set it up in the appointment section.
              </p>
              <p>
                Customer "SKW" appointments that are overdue. For rescheduling.please contact the customer & set it up in the appointment section.
              </p>
            </section>
            <section className={styles.sidebar}>
              <h1>Available space</h1>
              <p>
                This is the section for available space. You can see the user appointments, and settings pages.
              </p>
            </section>
          </container>
        </div>
      </div>
    </Layout>
  );
}
