"use client";

import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';
import styles from './layoutComponent.module.scss';
import TopNav from './navbarClient/TopNavClient';
const NavBarClient = dynamic(() => import('./navbarClient/NavbarClient'), { ssr: false });

const Layout = ({ children }) => {
  const pathname = usePathname();

  // List of routes where the navbar should be hidden
  const noNavbarRoutes = ['/login', '/signup', '/reset-password'];

  const shouldShowNavbar = !noNavbarRoutes.includes(pathname);

  return (
    <div className={styles.layoutContainer}>
      {shouldShowNavbar && <NavBarClient />}
      <main>
        {shouldShowNavbar && <TopNav />}
        <div className={styles.content}>
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
