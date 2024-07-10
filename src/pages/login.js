'use client';
import { useUser } from '@auth0/nextjs-auth0';
import Link from 'next/link';

const LoginPage = () => {
    const { user, error, isLoading } = useUser();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div>
            {user ? (
                <div>
                    <p>Welcome, {user.name}!</p>
                    <Link href="/dashboard">
                        <a>Go to Dashboard</a>
                    </Link>
                </div>
            ) : (
                <div>
                    <p>Please log in to continue:</p>
                    <a href="/api/auth/login">Log In</a>
                </div>
            )}
        </div>
    );
};

export default LoginPage;