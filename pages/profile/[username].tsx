import React from "react";
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
        <p className={styles.quote}>{data.profile.quote}</p>
      </div>
      <span>{data && JSON.stringify(data)}</span>
      <PostsContainer data={postsData} mutate={mutate} size="TextPost" />
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

export default Profile;
