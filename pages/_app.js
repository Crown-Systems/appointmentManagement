import { UserProvider } from '@auth0/nextjs-auth0/client';
import Layout from '../app/components/admin/layout/LayoutComponent';
import '../app/globals.css';
export default function App({ Component, pageProps }) {


    return (
        <UserProvider>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </UserProvider>
    );
}