import type { NextPage } from "next";
import React from "react";
import { AuthProtectedRoute } from "../components/AuthProtectedRoute";
import { NewPost } from "../components/NewPost";
import Page from "../components/Page";
import { PostsContainer } from "../components/Posts";
import styles from "../styles/home.module.scss";
import useSWR from "swr";
import { useAxios } from "../hooks/useAxios";
import { Loading } from "../components/Loading";
import Homebar from "../components/Homebar";

const Home: NextPage = () => {
  const { instance: axios, fetcher } = useAxios();

  const { data, mutate, error } = useSWR("/posts", fetcher, {
    refreshInterval: 1000,
  });

  return (
    <AuthProtectedRoute>
      {data ? (
        <Page
          title="Letzie"
          description="this is not a test"
          className={styles.home}
        >
          <NewPost mutate={mutate} />
          <PostsContainer size="TextPost" data={data} mutate={mutate} />
          <Homebar />
        </Page>
      ) : (
        <Loading />
      )}
    </AuthProtectedRoute>
  );
};

export default Home;
