import React from "react";
import Page from "./Page";
import styles from "../styles/legal.module.scss";
import Link from "next/link";
import { useRouter } from "next/router";

interface LegalProps {
  title: string;
  description: string;
  children?: React.ReactNode;
  important?: string;
}

export const Legal: React.FC<LegalProps> = ({
  title,
  description,
  children,
  important,
}) => {
  return (
    <Page title={title} description={description} className={styles.legal}>
      <header className={styles.header}>
        <p>{title}</p>
      </header>
      <section className={styles.information}>
        <span>
          {important && (
            <p>
              <strong>Important:</strong>
              {important}
            </p>
          )}
        </span>
        {children}
        <NavigationBar />
      </section>
    </Page>
  );
};

const NavigationBar: React.FC<{}> = () => {
  const { pathname } = useRouter();
  const pages = ["terms-of-service", "privacy-policy", "payment-policy"];

  return (
    <aside className={styles.navigationBar}>
      <h3>Legal</h3>
      <ul>
        {pages.map((p) => {
          let title = p.charAt(0).toUpperCase() + p.slice(1).replace(/-/g, " ");

          return (
            <li key={p}>
              {pathname === "/" + p && <span></span>}
              <Link href={"/" + p}>{title}</Link>
            </li>
          );
        })}
      </ul>
    </aside>
  );
};
