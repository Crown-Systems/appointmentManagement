'use client';
import { useUser } from '@auth0/nextjs-auth0/client';
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
                        Go to Dashboard
                    </Link>
                </div>
            ) : (
                <div>
                    <p>Please log in to continue:</p>
                    <button href="/api/auth/login">Log In</button>
                </div>
            )}
        </div>
    );
};

export default LoginPage;