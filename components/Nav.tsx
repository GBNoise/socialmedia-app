import React, { useContext } from "react";
import styles from "../styles/nav.module.scss";
import Link from "next/link";
import { useRouter } from "next/router";
import { NO_SIDEBAR_ROUTES } from "../constants";
import { authContext } from "../contexts/authContext";
import { signOut } from "next-auth/react";

const Nav = () => {
  const { pathname } = useRouter();
  const { session } = useContext(authContext);

  return (
    <nav className={styles.nav}>
      <ul>
        <li className={styles.logoContainer}>
          <Link href="/">
            <h1>Letzie</h1>
          </Link>
        </li>

        {NO_SIDEBAR_ROUTES.includes(pathname) || (
          <li className={styles.searchContainer}>
            <input type="text" placeholder="search" spellCheck={false} />
          </li>
        )}

        {!session?.user ? (
          <li className={styles.authContainer} data-auth="notauthenticated">
            <Link href="/auth?action=login">Login</Link>
            <Link href="/auth?action=create">Create</Link>
          </li>
        ) : (
          <li className={styles.authContainer} data-auth="authenticated">
            <span onClick={() => signOut()}></span>
            <p>{session.user.username}</p>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Nav;
