import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { getUserRole, isAuthenticated } from '../../utils/auth0';

const withAuth = (Component, role) => {
    const WithAuthComponent = (props) => {
        const router = useRouter();

        useEffect(() => {
            if (!isAuthenticated()) {
                router.push('/login');
            } else if (role && getUserRole() !== role) {
                router.push('/'); // Redirect to home or an unauthorized page
            }
        }, [router]);

        return isAuthenticated() ? <Component {...props} /> : null;
    };

    WithAuthComponent.displayName = `withAuth(${Component.displayName || Component.name || 'Component'})`;

    return WithAuthComponent;
};

export default withAuth;
