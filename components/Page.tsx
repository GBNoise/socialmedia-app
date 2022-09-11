import React from "react";
import Head from "next/head";
import styles from "../styles/page.module.scss";
import { NAV_HEIGHT, SIDEBAR_WIDTH } from "../constants/index";

declare type PageProps = {
  title: string;
  iconPath?: string;
  description: string;
  children?: React.ReactNode;
  adjust?: boolean;
  className?: string;
};

const Page: React.FC<PageProps> = ({
  title,
  iconPath = "/favicon.ico",
  description,
  children,
  adjust = true,
  className,
}) => {
  return (
    <div
      className={`${styles.page} ${className}`}
      style={
        adjust
          ? { marginTop: NAV_HEIGHT, marginLeft: SIDEBAR_WIDTH }
          : { marginTop: NAV_HEIGHT, flexBasis: "100%" }
      }
    >
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="icon" href={iconPath} />
      </Head>
      {children}
    </div>
  );
};

export default Page;
