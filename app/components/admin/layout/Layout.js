
import { UserProvider } from '@auth0/nextjs-auth0/client';
import NavBar from './navbar/Navbar';

export default function RootLayout({ children }) {
  return (
    <UserProvider>
      <NavBar />
      {children}
    </UserProvider>
  );
}
