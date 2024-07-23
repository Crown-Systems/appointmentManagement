import { getSession } from '@auth0/nextjs-auth0';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
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
    const isUser = user['http://localhost:3000/roles'].some((role) => role === 'user');

    if (isUser) {
        redirect('/admin');
    } else {
        redirect('/client');
    }

    // This part will not be reached because of the redirect
    return (
        <div className={styles['login-container']}>
            <h1>Crown Appointments</h1>
            <Image src={user.picture} alt="Crown Logo" width={200} height={200} />
            <p>Welcome, {user.name}!</p>
            <p>Email: {user.email}</p>
            <p>Role: {isUser ? 'User' : 'Client'}</p>
            <Link href={process.env.LOGOUT_URL}>Logout</Link>
        </div>
    );
};

export default LoginPage;
