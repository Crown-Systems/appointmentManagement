import { initAuth0 } from '@auth0/nextjs-auth0';

export default initAuth0({
    domain: 'YOUR_AUTH0_DOMAIN',
    clientId: 'YOUR_AUTH0_CLIENT_ID',
    clientSecret: 'YOUR_AUTH0_CLIENT_SECRET',
    scope: 'openid profile',
    redirectUri: 'http://localhost:3000/api/callback', // Adjust based on your environment
    postLogoutRedirectUri: 'http://localhost:3000/',
    session: {
        // Ensure to provide a secure secret for session encryption
        secret: 'YOUR_SESSION_SECRET', // Replace with a securely generated secret
        cookieLifetime: 60 * 60 * 8, // 8 hours (in seconds)
        cookieDomain: 'your-domain.com', // Replace with your domain
        cookieSameSite: 'strict',
        cookiePath: '/',
        storeAccessToken: true,
        storeRefreshToken: true,
    },
});