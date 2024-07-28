import { UserProvider } from '@auth0/nextjs-auth0/client';
import { useEffect } from 'react';
import '../app/globals.css';

export default function App({ Component, pageProps }) {

    useEffect(() => {
        const syncDatabase = async () => {
            try {
                await fetch('/api/sync');
            } catch (error) {
                console.error('Database synchronization failed:', error);
            }
        };
        syncDatabase();
    }, []);

    return (
        <UserProvider>
            <Component {...pageProps} />
        </UserProvider>
    );
}