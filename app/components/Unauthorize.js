
import Link from 'next/link';
import styles from './unauthorize.module.scss';

const UnauthorizedPage = () => {
    return (
        <div className={styles.container}>
            <h1 className={styles.heading}>Access Denied</h1>
            <p className={styles.message}>
                You do not have permission to view this page.
            </p>
            <Link className={styles.button} href="/" passHref>
                Home Page
            </Link>
            <Link className={styles.button} href="api/auth/login" passHref>
                Login
            </Link>
        </div>
    );
};

export default UnauthorizedPage;
