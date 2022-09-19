import React from "react";
import { MutatorOptions } from "swr";
import Page from "../components/Page";
import { ImagePost, PostsContainer } from "../components/Posts";
import styles from "../styles/posts.module.scss";

const Posts = () => {
  const data = [
    { title: "sometitle", imgUrl: "/image1.jpg", size: "" },
    { title: "sometitle", imgUrl: "/image2.jpg", size: "" },
    { title: "sometitle", imgUrl: "/image3.jpg", size: "" },
    { title: "sometitle", imgUrl: "/image4.jpg", size: "" },
    { title: "sometitle", imgUrl: "/image1.jpg", size: "" },
    { title: "sometitle", imgUrl: "/image2.jpg", size: "" },
    { title: "sometitle", imgUrl: "/image3.jpg", size: "" },
    { title: "sometitle", imgUrl: "/image4.jpg", size: "" },
    { title: "sometitle", imgUrl: "/image1.jpg", size: "" },
    { title: "sometitle", imgUrl: "/image2.jpg", size: "" },
    { title: "sometitle", imgUrl: "/image3.jpg", size: "" },
    { title: "sometitle", imgUrl: "/image4.jpg", size: "" },
    { title: "sometitle", imgUrl: "/image1.jpg", size: "" },
    { title: "sometitle", imgUrl: "/image2.jpg", size: "" },
    { title: "sometitle", imgUrl: "/image3.jpg", size: "" },
    { title: "sometitle", imgUrl: "/image4.jpg", size: "" },
    { title: "sometitle", imgUrl: "/image1.jpg", size: "" },
    { title: "sometitle", imgUrl: "/image2.jpg", size: "" },
    { title: "sometitle", imgUrl: "/image3.jpg", size: "" },
    { title: "sometitle", imgUrl: "/image4.jpg", size: "" },
    { title: "sometitle", imgUrl: "/image1.jpg", size: "" },
    { title: "sometitle", imgUrl: "/image2.jpg", size: "" },
    { title: "sometitle", imgUrl: "/image3.jpg", size: "" },
    { title: "sometitle", imgUrl: "/image4.jpg", size: "" },
    { title: "sometitle", imgUrl: "/image1.jpg", size: "" },
    { title: "sometitle", imgUrl: "/image2.jpg", size: "" },
    { title: "sometitle", imgUrl: "/image3.jpg", size: "" },
    { title: "sometitle", imgUrl: "/image4.jpg", size: "" },
  ];

  return (
    <Page title={"Posts"} description={"posts"}>
      <PostsContainer size={"ImagePost"} data={data} mutate={() => undefined} />
    </Page>
  );
};

export default Posts;
