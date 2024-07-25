"use client";

import { usePathname } from 'next/navigation';
import styles from './layoutComponent.module.scss';
import NavBar from './navbar/Navbar';
import TopNav from './navbar/TopNav';

const Layout = ({ children }) => {
  const pathname = usePathname();

  // List of routes where the navbar should be hidden
  const noNavbarRoutes = ['/login', '/signup', '/reset-password'];

  const shouldShowNavbar = !noNavbarRoutes.includes(pathname);

  return (
    <div className={styles.layoutContainer}>
      {shouldShowNavbar && <NavBar />}
      <main>
        {shouldShowNavbar && <TopNav />}
        <div className="content">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
