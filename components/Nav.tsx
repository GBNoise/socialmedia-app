import React, { useContext, useState, useEffect, useMemo } from "react";
import styles from "../styles/nav.module.scss";
import Link from "next/link";
import { useRouter } from "next/router";
import { NO_SIDEBAR_ROUTES } from "../constants";
import { authContext } from "../contexts/authContext";
import { signOut } from "next-auth/react";
import { faMoon, faSignOut } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Nav = () => {
  return (
    <nav className={styles.nav}>
      <ul>
        <Logo />
        <Searchbar />
        <AuthUser />
      </ul>
    </nav>
  );
};

const Logo = () => {
  return (
    <li className={styles.logoContainer}>
      <Link href="/">
        <h1>Letzie</h1>
      </Link>
    </li>
  );
};

const Searchbar = () => {
  const { pathname } = useRouter();

  return (
    <>
      {NO_SIDEBAR_ROUTES.includes(pathname) || (
        <li className={styles.searchContainer}>
          <input type="text" placeholder="search" spellCheck={false} />
        </li>
      )}
    </>
  );
};

const AuthUser = () => {
  const { session } = useContext(authContext);
  const [isAuthOptionsHidden, setIsAuthOptionsHidden] = useState<boolean>(true);

  const [onlineStatus, setOnlineStatus] = useState<string>("online");

  // useEffect(() => {
  //   setOnlineStatus(() => (window.navigator.onLine ? "online" : "offline"));
  // }, [window.navigator.onLine]);

  const toggleAuthOptions = (e: MouseEvent | React.MouseEvent) => {
    e.stopPropagation();

    setIsAuthOptionsHidden((p) => !p);
  };
  return (
    <>
      {!session?.user ? (
        <li className={styles.authContainer} data-auth="notauthenticated">
          <Link href="/auth?action=login">Login</Link>
          <Link href="/auth?action=create">Create</Link>
        </li>
      ) : (
        <li
          className={styles.authContainer}
          onClick={toggleAuthOptions}
          data-auth="authenticated"
        >
          <span className={styles.picture}></span>
          <p>{session.user.username}</p>
          <span className={styles.status} data-status={onlineStatus}></span>
          {!isAuthOptionsHidden && <AuthUserOptions />}
        </li>
      )}
    </>
  );
};

const AuthUserOptions = () => {
  const cbOptions = [
    { title: "dark mode", cb: () => undefined, icon: faMoon },
    { title: "Sign Out", cb: signOut, icon: faSignOut },
  ];

  return (
    <ul className={styles.authOptions}>
      {cbOptions.map(({ title, cb, icon }) => {
        return (
          <li
            onClick={(e: any) => {
              e.stopPropagation();
              cb();
            }}
          >
            <FontAwesomeIcon icon={icon} className={styles.icon} />
            <p>{title}</p>
          </li>
        );
      })}
    </ul>
  );
};

export default Nav;
