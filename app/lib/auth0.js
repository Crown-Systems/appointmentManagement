import { initAuth0 } from "@auth0/nextjs-auth0";

export default initAuth0({
  domain: process.env.AUTH0_ISSUER_BASE_URL,
  clientId: process.env.AUTH0_CLIENT_ID,
  clientSecret: process.env.AUTH0_CLIENT_SECRET,
  redirectUri: process.env.NEXT_PUBLIC_AUTH0_REDIRECT_URI,
  postLogoutRedirectUri: process.env.NEXT_PUBLIC_AUTH0_POST_LOGOUT_REDIRECT_URI,
  session: {
    cookieSecret: process.env.AUTH0_SECRET,
  },
  scope: process.env.AUTH0_SCOPE,
});
