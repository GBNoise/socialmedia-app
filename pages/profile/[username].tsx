import React, { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import Page from "../../components/Page";
import { useAxios } from "../../hooks/useAxios";
import useSwr from "swr";
import { Loading } from "../../components/Loading";
import styles from "../../styles/profile.module.scss";
import { PostsContainer } from "../../components/Posts";

const Profile = () => {
  const router = useRouter();
  const { username } = router.query;
  const { instance: axios, fetcher } = useAxios();

  const { data, error } = useSwr(`/users/profile/${username}`, fetcher);
  const {
    data: postsData,
    error: postsError,
    mutate,
  } = useSwr(`/posts/${username}`, fetcher);

  if (!data) return <Loading />;

  return (
    <Page
      title={username + "'s Profile"}
      description={""}
      className={styles.profile}
    >
      <ProfileImage imgUrl="" size="header" />
      <div className={styles.metadata}>
        <ProfileImage imgUrl={""} size="pfp" />
        <h1 className={styles.title}>{username}</h1>
        <p className={styles.quote}>{data.profile?.quote}</p>
      </div>
      {/* <span>{data && JSON.stringify(data)}</span> */}
      <PostsContainer data={postsData} mutate={mutate} size="TextPost" />
      <Misc />
    </Page>
  );
};

const ProfileImage: React.FC<{ imgUrl: string; size: "header" | "pfp" }> = ({
  imgUrl,
  size,
}) => {
  // return <img src={imgUrl} alt="header" />;
  return (
    <div className={size === "header" ? styles.headerImage : styles.pfp}></div>
  );
};

const Misc: React.FC = () => {
  const [scroll, setScroll] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);

  const onScroll = (e: any) => {
    if (!window) return;
    let value = window.scrollY;
    changeRefPosition(value);
  };

  const changeRefPosition = (value: number) => {
    if (!ref.current) return;

    if (!scroll && value >= 420) {
      ref.current.style.position = "fixed";
      ref.current.style.top = "50px";
      ref.current.style.width = "calc(28.4% - 110px)";
      ref.current.style.right = "20px";
      // ref.current.style.marginTop = `${value + 20}px`;
      setScroll(true);
    } else {
      ref.current.style.position = "static";
      ref.current.style.width = "100%";
      setScroll(false);
    }
  };

  useEffect(() => {
    let event = document.addEventListener("scroll", onScroll);

    return () => document.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <aside className={styles.misc} ref={ref}>
      <div className={styles.miscContent}>{}</div>
    </aside>
  );
};
export default Profile;
