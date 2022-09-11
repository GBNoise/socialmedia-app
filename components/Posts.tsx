import React from "react";
import Image from "next/image";
import styles from "../styles/posts.module.scss";

declare type PostProps = {
  title: string;
  imgUrl: string;
  link?: string;
  id?: string;
};

export const Posts = () => {
  const arr = [
    <Post title="psots" imgUrl="/image1.jpg" />,
    <Post title="psots" imgUrl="/image2.jpg" />,
    <Post title="psots" imgUrl="/image3.jpg" />,
    <Post title="psots" imgUrl="/image4.jpg" />,
    <Post title="psots" imgUrl="/image1.jpg" />,
    <Post title="psots" imgUrl="/image2.jpg" />,
    <Post title="psots" imgUrl="/image3.jpg" />,
    <Post title="psots" imgUrl="/image4.jpg" />,
    <Post title="psots" imgUrl="/image1.jpg" />,
    <Post title="psots" imgUrl="/image2.jpg" />,
    <Post title="psots" imgUrl="/image3.jpg" />,
    <Post title="psots" imgUrl="/image4.jpg" />,
    <Post title="psots" imgUrl="/image1.jpg" />,
    <Post title="psots" imgUrl="/image2.jpg" />,
    <Post title="psots" imgUrl="/image3.jpg" />,
    <Post title="psots" imgUrl="/image4.jpg" />,
    <Post title="psots" imgUrl="/image1.jpg" />,
    <Post title="psots" imgUrl="/image2.jpg" />,
    <Post title="psots" imgUrl="/image3.jpg" />,
    <Post title="psots" imgUrl="/image4.jpg" />,
    <Post title="psots" imgUrl="/image1.jpg" />,
    <Post title="psots" imgUrl="/image2.jpg" />,
    <Post title="psots" imgUrl="/image3.jpg" />,
    <Post title="psots" imgUrl="/image4.jpg" />,
    <Post title="psots" imgUrl="/image1.jpg" />,
    <Post title="psots" imgUrl="/image2.jpg" />,
    <Post title="psots" imgUrl="/image3.jpg" />,
    <Post title="psots" imgUrl="/image4.jpg" />,
    <Post title="psots" imgUrl="/image1.jpg" />,
    <Post title="psots" imgUrl="/image2.jpg" />,
    <Post title="psots" imgUrl="/image3.jpg" />,
    <Post title="psots" imgUrl="/image4.jpg" />,
    <Post title="psots" imgUrl="/image1.jpg" />,
    <Post title="psots" imgUrl="/image2.jpg" />,
    <Post title="psots" imgUrl="/image3.jpg" />,
    <Post title="psots" imgUrl="/image4.jpg" />,
    <Post title="psots" imgUrl="/image1.jpg" />,
    <Post title="psots" imgUrl="/image2.jpg" />,
    <Post title="psots" imgUrl="/image3.jpg" />,
    <Post title="psots" imgUrl="/image4.jpg" />,
    <Post title="psots" imgUrl="/image1.jpg" />,
    <Post title="psots" imgUrl="/image2.jpg" />,
    <Post title="psots" imgUrl="/image3.jpg" />,
    <Post title="psots" imgUrl="/image4.jpg" />,
    <Post title="psots" imgUrl="/image1.jpg" />,
    <Post title="psots" imgUrl="/image2.jpg" />,
    <Post title="psots" imgUrl="/image3.jpg" />,
    <Post title="psots" imgUrl="/image4.jpg" />,
    <Post title="psots" imgUrl="/image1.jpg" />,
    <Post title="psots" imgUrl="/image2.jpg" />,
    <Post title="psots" imgUrl="/image3.jpg" />,
    <Post title="psots" imgUrl="/image4.jpg" />,
    <Post title="psots" imgUrl="/image1.jpg" />,
    <Post title="psots" imgUrl="/image2.jpg" />,
    <Post title="psots" imgUrl="/image3.jpg" />,
    <Post title="psots" imgUrl="/image4.jpg" />,
    <Post title="psots" imgUrl="/image1.jpg" />,
    <Post title="psots" imgUrl="/image2.jpg" />,
    <Post title="psots" imgUrl="/image3.jpg" />,
    <Post title="psots" imgUrl="/image4.jpg" />,
    <Post title="psots" imgUrl="/image1.jpg" />,
    <Post title="psots" imgUrl="/image2.jpg" />,
    <Post title="psots" imgUrl="/image3.jpg" />,
    <Post title="psots" imgUrl="/image4.jpg" />,
    <Post title="psots" imgUrl="/image1.jpg" />,
    <Post title="psots" imgUrl="/image2.jpg" />,
    <Post title="psots" imgUrl="/image3.jpg" />,
    <Post title="psots" imgUrl="/image4.jpg" />,
    <Post title="psots" imgUrl="/image1.jpg" />,
    <Post title="psots" imgUrl="/image2.jpg" />,
    <Post title="psots" imgUrl="/image3.jpg" />,
    <Post title="psots" imgUrl="/image4.jpg" />,
    <Post title="psots" imgUrl="/image1.jpg" />,
    <Post title="psots" imgUrl="/image2.jpg" />,
    <Post title="psots" imgUrl="/image3.jpg" />,
    <Post title="psots" imgUrl="/image4.jpg" />,
    <Post title="psots" imgUrl="/image1.jpg" />,
    <Post title="psots" imgUrl="/image2.jpg" />,
    <Post title="psots" imgUrl="/image3.jpg" />,
    <Post title="psots" imgUrl="/image4.jpg" />,
    <Post title="psots" imgUrl="/image1.jpg" />,
    <Post title="psots" imgUrl="/image2.jpg" />,
    <Post title="psots" imgUrl="/image3.jpg" />,
    <Post title="psots" imgUrl="/image4.jpg" />,
    <Post title="psots" imgUrl="/image1.jpg" />,
    <Post title="psots" imgUrl="/image2.jpg" />,
    <Post title="psots" imgUrl="/image3.jpg" />,
    <Post title="psots" imgUrl="/image4.jpg" />,
    <Post title="psots" imgUrl="/image1.jpg" />,
    <Post title="psots" imgUrl="/image2.jpg" />,
    <Post title="psots" imgUrl="/image3.jpg" />,
    <Post title="psots" imgUrl="/image4.jpg" />,
    <Post title="psots" imgUrl="/image1.jpg" />,
    <Post title="psots" imgUrl="/image2.jpg" />,
    <Post title="psots" imgUrl="/image3.jpg" />,
    <Post title="psots" imgUrl="/image4.jpg" />,
    <Post title="psots" imgUrl="/image1.jpg" />,
    <Post title="psots" imgUrl="/image2.jpg" />,
    <Post title="psots" imgUrl="/image3.jpg" />,
    <Post title="psots" imgUrl="/image4.jpg" />,
    <Post title="psots" imgUrl="/image1.jpg" />,
    <Post title="psots" imgUrl="/image2.jpg" />,
    <Post title="psots" imgUrl="/image3.jpg" />,
    <Post title="psots" imgUrl="/image4.jpg" />,
    <Post title="psots" imgUrl="/image1.jpg" />,
    <Post title="psots" imgUrl="/image2.jpg" />,
    <Post title="psots" imgUrl="/image3.jpg" />,
    <Post title="psots" imgUrl="/image4.jpg" />,
  ];
  return <div className={styles.postsContainer}>{arr.map((el) => el)}</div>;
};

const Post: React.FC<PostProps> = ({ title, imgUrl }) => {
  return (
    <div className={styles.post}>
      <img src={imgUrl} alt="post image" />
      <span>
        <p>{title}</p>
        <button>Save</button>
      </span>
    </div>
  );
};
