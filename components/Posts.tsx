import React, { useContext, useMemo, useRef } from "react";
import styles from "../styles/posts.module.scss";
import moment from "moment";
import { IconDefinition } from "@fortawesome/fontawesome-common-types";
import { useAxios } from "../hooks/useAxios";
import { KeyedMutator } from "swr";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookmark,
  faComment,
  faHeart,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { authContext } from "../contexts/authContext";

declare type PostsContainerProps = {
  size: "ImagePost" | "TextPost";
  data: ImagePostProps["data"][] | TextPostProps["data"][];
  mutate: KeyedMutator<any> | Function;
  maxHeight?: string;
};

declare type ImagePostProps = {
  data: {
    title: string;
    imgUrl: string;
    link?: string;
    id?: string;
    size: string;
  };
};
declare type TextPostProps = {
  data: {
    id: number | string;
    content: string;
    images?: any;
    createdAt: Date | string;
    updatedAt: Date | string;
    owner: {
      id: string;
      username: string;
      profile: {
        picture: string;
      };
    };
    likedBy: {
      id: string;
      username: string;
    }[];
    savedBy: {
      id: string;
      username: string;
    }[];
  };
  onDelete: Function;
  user: string;
  onLike: Function;
  onSave: Function;
};

declare type TextPostOptions = {
  title: string;
  action: Function;
  icon?: IconDefinition;
  meta?: string | number;
  ref?: React.RefObject<any>;
};

export const PostsContainer: React.FC<PostsContainerProps> = ({
  size,
  data,
  mutate,
  maxHeight,
}) => {
  const { instance: axios } = useAxios();
  const { session } = useContext(authContext);

  const onDelete = async function (id: string | number) {
    await axios.delete("/posts", { data: { post: { id } } });
    mutate();
  };

  const onLike = async function (
    postID: number,
    userID: string,
    liked: boolean
  ) {
    await axios.put("/posts", { post: { postID, userID, liked } });
    mutate();
  };

  const onSave = async function (
    postID: number,
    userID: string,
    saved: boolean
  ) {
    await axios.put("/posts", { post: { postID, userID, saved } });
    mutate();
  };

  const renderImagePost = () => {
    if (!data) return;
    return data.map((post) => {
      post = post as ImagePostProps["data"];
      return <ImagePost data={post} />;
    });
  };

  const renderTextPost = () => {
    if (!data) return;
    return data.map((post) => {
      post = post as TextPostProps["data"];
      return (
        <TextPost
          data={post}
          onDelete={onDelete}
          user={session.user.id}
          onLike={onLike}
          onSave={onSave}
        />
      );
    });
  };

  return (
    <div
      className={styles.postsContainer}
      data-attr={size}
      style={{ maxHeight }}
    >
      {size === "TextPost" ? renderTextPost() : renderImagePost()}
    </div>
  );
};

export const ImagePost: React.FC<ImagePostProps> = ({ data }) => {
  const { size, imgUrl, title } = data;
  return (
    <div className={styles.post} data-attr={size}>
      <img src={imgUrl} alt="post image" />
      <span>
        <p>{title}</p>
        <button>Save</button>
      </span>
    </div>
  );
};

export const TextPost: React.FC<TextPostProps> = ({
  data,
  onDelete,
  user,
  onLike,
  onSave,
}) => {
  const { id, content, images, createdAt, updatedAt, owner, likedBy, savedBy } =
    data;
  const optionsRef = useRef<HTMLUListElement>(null);
  const optionsBtnRef = useRef<HTMLSpanElement>(null);
  const options: TextPostOptions[] = [
    { title: "delete post", action: onDelete },
  ];
  const likes = useMemo(() => likedBy.map((obj) => obj.id), [likedBy]);
  const saves = useMemo(() => savedBy.map((obj) => obj.id), [savedBy]);
  const heartRef = useRef<any>(null);
  const saveRef = useRef<any>(null);

  const interact: TextPostOptions[] = [
    {
      title: "Like",
      icon: faHeart,
      action: () => {
        if (!heartRef.current) return;
        if (!likes.includes(user))
          heartRef.current.style.animation = "pulse 0.4s linear";
        else heartRef.current.style.animation = "";

        onLike(id, user, likes.includes(user));
      },
      meta: likes.length,
      ref: heartRef,
    },
    { title: "comments", icon: faComment, action: () => undefined, meta: 0 },
    {
      title: "Save",
      icon: faBookmark,
      action: () => {
        if (!saveRef.current) return;
        if (!saves.includes(user))
          saveRef.current.style.animation = "pulse 0.4 linear";
        else saveRef.current.style.animation = "";

        onSave(id, user, saves.includes(user));
      },
      meta: saves.length,
      ref: saveRef,
    },
  ];

  const toggleOptions = () => {
    if (!optionsRef.current || !optionsBtnRef.current) return;

    if (optionsRef.current.style.display === "none") {
      optionsRef.current.style.display = "flex";
      optionsBtnRef.current.style.transform = "rotate(90deg)";
    } else {
      optionsRef.current.style.display = "none";
      optionsBtnRef.current.style.transform = "";
    }
  };

  const paintInteract = () => {
    let className = "";
    if (likes.includes(user)) className += `${styles.liked}`;
    if (saves.includes(user)) className += ` ${styles.saved}`;
    return className;
  };

  return (
    <div className={styles.post}>
      <span className={styles.info}>
        <Link href={`/profile/${owner.username}`}>
          <p className={styles.username}>@{owner.username}</p>
        </Link>
        <div className={styles.picture}></div>
        <p className={styles.content}>{content}</p>
        <span className={styles.meta}>{`${moment(updatedAt).fromNow()}`}</span>
        <span className={styles.interact}>
          {interact.map((int) => {
            int.icon = int.icon as IconDefinition;
            return (
              <>
                <FontAwesomeIcon
                  icon={int.icon}
                  className={paintInteract()}
                  onClick={() => int.action()}
                  ref={int.ref}
                />
                <p>{int.meta}</p>
              </>
            );
          })}
        </span>
      </span>
      {user === owner.id && (
        <>
          <span
            className={styles.optionsBtn}
            onClick={toggleOptions}
            ref={optionsBtnRef}
          />
          <ul className={styles.options} ref={optionsRef}>
            {options.map((op) => (
              <li onClick={() => op.action(id)}>
                <FontAwesomeIcon icon={faTrash} />
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

// export const TextPost
