import { getSession } from "@auth0/nextjs-auth0";
import dynamic from "next/dynamic";
import prisma from "../../app/lib/prisma";
import styles from "./clientHome.module.scss";

const ClientLayout = dynamic(() =>
  import("../../app/components/client/layoutClient/LayoutComponent")
);

const Client = ({ user, role, initialEvents, services }) => {
  return (
    <ClientLayout>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1>Welcome to Crown Appointments</h1>
          {user ? (
            <p className={styles.welcome}>
              Welcome, {user.name}! You are logged in as {role}.
            </p>
          ) : (
            <p>Loading...</p>
          )}
        </header>
        <main className={styles.mainContent}>
          <section className={styles.servicesSection}>
            <h2>Our Services</h2>
            <ul className={styles.servicesList}>
              {services.map((service, index) => (
                <li key={index} className={styles.serviceItem}>
                  {service}
                </li>
              ))}
            </ul>
          </section>
          <section className={styles.eventsSection}>
            <h2>Your Bookings</h2>
            {/* Display initial events or a calendar component */}
          </section>
        </main>
        <footer className={styles.footer}>
          <p>© 2024 Crown Appointments. All rights reserved.</p>
        </footer>
      </div>
    </ClientLayout>
  );
};

export const getServerSideProps = async (context) => {
  const session = await getSession(context.req, context.res);

  if (!session) {
    return {
      redirect: {
        destination: process.env.LOGIN_URL,
        permanent: false,
      },
    };
  }

  const user = session.user;

  // Extract role from session (defaulting to 'User' if no role found)
  const roleName = user["http://localhost:3000/roles"]
    ? user["http://localhost:3000/roles"][0]
    : "User";

  // Find or create the role in the database
  let role = await prisma.role.findUnique({
    where: {
      name: roleName,
    },
  });

  if (!role) {
    role = await prisma.role.create({
      data: {
        name: roleName,
      },
    });
  }

  // Check if the user exists in the local database
  let dbUser = await prisma.user.findUnique({
    where: {
      email: user.email,
    },
  });

  if (!dbUser) {
    // Create the user if not found in the database
    dbUser = await prisma.user.create({
      data: {
        email: user.email,
        name: user.name || user.email, // Use email as name if name is not available
        authId: user.sub, // Use Auth0 ID as a unique identifier
      },
    });

    // Assign the role to the user
    await prisma.userRole.create({
      data: {
        userId: dbUser.id,
        roleId: role.id,
      },
    });
  } else {
    // Ensure the user has the correct role
    await prisma.userRole.upsert({
      where: {
        userId_roleId: {
          userId: dbUser.id,
          roleId: role.id,
        },
      },
      update: {},
      create: {
        userId: dbUser.id,
        roleId: role.id,
      },
    });
  }

  // Fetch initial events and services from the database
  const initialEvents = [
    {
      title: "Existing Booking",
      start: new Date().toISOString(),
      end: new Date().toISOString(),
    },
  ];

  const services = ["Grooming", "Veterinary Checkup", "Swimming"];

  return {
    props: {
      user: { name: dbUser.name, email: dbUser.email },
      role: role.name,
      initialEvents,
      services,
    },
  };
};

export default Client;
