import UnauthorizedPage from '@/app/components/unauthorize';
import { getSession, withPageAuthRequired } from '@auth0/nextjs-auth0';
import Layout from '../../app/components/admin/layout/LayoutComponent';
import styles from './adminHome.module.scss';

export default function adminHomePage({ user }) {
  const userRoles = user['http://localhost:3000/roles'] || [];
  console.log(userRoles);
  if (!userRoles.includes('admin')) {
    return (
      <UnauthorizedPage />
    );
  }

  return (
    <Layout>
      <div className={styles.mainContainer}>
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

// Secure the page and retrieve session data
export const getServerSideProps = withPageAuthRequired({
  // This will redirect the user to the login page if they're not authenticated
  returnTo: '/admin', // Optional: path to return to after login
  getServerSideProps: async ({ req, res }) => {
    // Access the session information
    const session = await getSession(req, res);

    if (!session || !session.user) {
      // If no session or user data, redirect to login
      return {
        redirect: {
          destination: '/api/auth/login',
          permanent: false,
        },
      };
    }

    return {
      props: {
        user: session.user, // Pass user data to the page component
      },
    };
  },
});