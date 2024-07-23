import { getSession } from '@auth0/nextjs-auth0';
import Image from 'next/image';
import Link from 'next/link';
import styles from './page.module.scss';

const LoginPage = async () => {
    const session = await getSession();

    if (!session) {
        return (
            <div className={styles['login-container']}>
                <Image src="/vercel.svg" alt="Crown Logo" width={200} height={200} />
                <h1>Crown Appointments</h1>
                <p>Please log in to continue:</p>
                <Link href={process.env.LOGIN_URL}>Login</Link>
            </div>
        );
    }

    const { user } = session;

    if (user) {
        const isAdmin = session.user['http://localhost:3000/roles'].some((role) => role === 'admin');

        return (
            <div className={styles['login-container']}>
                <h1>Crown Appointments</h1>
                <Image src={user.picture} alt="Crown Logo" width={200} height={200} />
                <p>Welcome, {user.name}!</p>
                <p>Email: {user.email}</p>
                <p>Role: {isAdmin ? 'Admin' : 'User not found'}</p>
                <Link href={process.env.LOGOUT_URL}>Logout</Link>
            </div>
        );
    }
};

export default LoginPage;
