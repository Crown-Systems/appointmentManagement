import Link from 'next/link';
import styles from './topNav.module.scss';

const TopNav = () => {
    return (
        <nav className={styles.flexContainer}>
            <div className={styles.topBar}>
                <div className={styles.topBarSearch}>
                    <form action="/api/search" method="POST" role="search">
                        <input className={styles.search} type="search" placeholder="Search..." autoFocus required />
                        <button type="submit">GO</button>
                    </form>
                </div>
                <div className={styles.topBarSide}>
                    <Link className={styles.sectionLink} href="/admin/appointments">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                            <path d="M12 2C10.34 2 9 3.34 9 5v.29C6.28 6.6 4.24 9.24 4.05 12H4c-.55 0-1 .45-1 1s.45 1 1 1h.05c.2 2.76 2.24 5.4 4.95 6.71V20h6v-.29c2.71-1.31 4.75-3.95 4.95-6.71H20c.55 0 1-.45 1-1s-.45-1-1-1h-.05c-.19-2.76-2.23-5.4-4.95-6.71V5c0-1.66-1.34-3-3-3zm0 2c.55 0 1 .45 1 1v1.08c2.27 1.14 4.06 3.38 4.42 6.01h-10.84c.36-2.63 2.15-4.87 4.42-6.01V5c0-.55.45-1 1-1zm1 14h-2v1h2v-1zm-1 3c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2z" />
                        </svg>
                    </Link>
                    <Link className={styles.sectionLink} href="/admin/clients">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="24" height="24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11c2.21 0 4-1.79 4-4S14.21 3 12 3 8 4.79 8 7s1.79 4 4 4zM4 21v-2c0-2.21 3.58-4 8-4s8 1.79 8 4v2H4z" />
                        </svg>
                        User
                    </Link>
                    <Link className={styles.sectionLink} href="/admin/settings">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" enableBackground="new 0 0 50 50">
                            <path fill="#494c4e" d="M27.7 44h-5.4l-1.5-4.6c-1-.3-2-.7-2.9-1.2l-4.4 2.2-3.8-3.8 2.2-4.4c-.5-.9-.9-1.9-1.2-2.9L6 27.7v-5.4l4.6-1.5c.3-1 .7-2 1.2-2.9l-2.2-4.4 3.8-3.8 4.4 2.2c.9-.5 1.9-.9 2.9-1.2L22.3 6h5.4l1.5 4.6c1 .3 2 .7 2.9 1.2l4.4-2.2 3.8 3.8-2.2 4.4c.5.9.9 1.9 1.2 2.9l4.6 1.5v5.4l-4.6 1.5c-.3 1-.7 2-1.2 2.9l2.2 4.4-3.8 3.8-4.4-2.2c-.9.5-1.9.9-2.9 1.2L27.7 44zm-4-2h2.6l1.4-4.3.5-.1c1.2-.3 2.3-.8 3.4-1.4l.5-.3 4 2 1.8-1.8-2-4 .3-.5c.6-1 1.1-2.2 1.4-3.4l.1-.5 4.3-1.4v-2.6l-4.3-1.4-.1-.5c-.3-1.2-.8-2.3-1.4-3.4l-.3-.5 2-4-1.8-1.8-4 2-.5-.3c-1.1-.6-2.2-1.1-3.4-1.4l-.5-.1L26.3 8h-2.6l-1.4 4.3-.5.1c-1.2.3-2.3.8-3.4 1.4l-.5.3-4-2-1.8 1.8 2 4-.3.5c-.6 1-1.1 2.2-1.4 3.4l-.1.5L8 23.7v2.6l4.3 1.4.1.5c.3 1.2.8 2.3 1.4 3.4l.3.5-2 4 1.8 1.8 4-2 .5.3c1.1.6 2.2 1.1 3.4 1.4l.5.1 1.4 4.3z" />
                            <path fill="#494c4e" d="M25 34c-5 0-9-4-9-9s4-9 9-9 9 4 9 9-4 9-9 9zm0-16c-3.9 0-7 3.1-7 7s3.1 7 7 7 7-3.1 7-7-3.1-7-7-7z" />
                        </svg>
                        Settings
                    </Link>
                    <Link className={styles.sectionLink} href={process.env.NEXT_PUBLIC_LOGOUT_URL}>
                        Logout
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default TopNav;
