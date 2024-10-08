
import { UserProvider } from '@auth0/nextjs-auth0/client';
import NavBar from './components/navbar/Navbar';
import './globals.css';

// export const metadata = {
//   title: 'Create Next App',
//   description: 'Generated by create next app',
// };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <UserProvider>
          <NavBar />
          {children}
        </UserProvider>
      </body>
    </html>
  );
}
