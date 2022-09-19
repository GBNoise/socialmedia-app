import React, { useCallback, useContext, useRef } from "react";
import { authContext } from "../contexts/authContext";
import { useAxios } from "../hooks/useAxios";
import styles from "../styles/homebar.module.scss";
import useSWR from "swr";
import { Spinner } from "./Loading";
import Link from "next/link";

const Homebar = () => {
  const { session } = useContext(authContext);

  return (
    <aside className={styles.homebar}>
      <Friends userID={session.user.id} />
      <Stories />
      <Trends />
    </aside>
  );
};

declare type FriendsData = {
  username: string;
  profile: any;
};

const Friends: React.FC<{ userID: string }> = ({ userID }) => {
  const { instance: axios, fetcher } = useAxios();
  const { data, error } = useSWR(`users/friends/${userID}`, fetcher) as {
    data: { friends: FriendsData[] };
    error: any;
  };
  if (!data || data.friends.length === 0) return <Spinner />;
  if (error) return <h1>Error</h1>;

  console.log(data);
  return (
    <div className={styles.friends}>
      <h4>Friends</h4>
      <ul className={styles.list}>
        {data.friends.length > 0 &&
          data.friends.map((friend, i) => {
            return (
              <Link href={`/profile/${friend.username}`}>
                <li key={friend.username}>
                  <span className={styles.picture} />
                  <p className={styles.name}>{friend.username}</p>
                  <span
                    className={styles.status}
                    data-attr={i % 2 == 0 ? "online" : "offline"}
                  />
                </li>
              </Link>
            );
          })}
      </ul>
    </div>
  );
};

const Stories = () => {
  const arr = new Array(100).fill(0);
  const listRef = useRef<HTMLUListElement>(null);

  function scroll(action: "left" | "right") {
    if (!listRef.current) return;

    const currentScroll = listRef.current.scrollLeft;
    const value = () =>
      action === "right" ? currentScroll + 70 * 4 : currentScroll - 70 * 4;
    listRef.current.scroll({
      left: value(),
      behavior: "smooth",
    });
  }

  return (
    <div className={styles.stories}>
      <ul className={styles.list} ref={listRef}>
        {arr.map((some) => {
          return <li></li>;
        })}
      </ul>
      <button className={styles.btn} onClick={() => scroll("left")}>
        {"<"}
      </button>
      <button className={styles.btn} onClick={() => scroll("right")}>
        {">"}
      </button>
    </div>
  );
};

declare type TrendsData = {
  title: string;
  postAmount: number | string;
};

const Trends = () => {
  const trends: TrendsData[] = [
    { title: "Real Madrid", postAmount: 100000 },
    { title: "Karim Benzema", postAmount: 16900 },
    { title: "Vini", postAmount: 1000 },
    { title: "Vinicius", postAmount: 12000 },
    { title: "Real Madrid", postAmount: 100000 },
    { title: "Karim Benzema", postAmount: 16900 },
    { title: "Vini", postAmount: 1000 },
    { title: "Vinicius", postAmount: 12000 },
  ];

  const format = useCallback((quantity: number) => {
    if (quantity >= 1000) return `${quantity / 1000}k`;
    return quantity;
  }, []);

  return (
    <div className={styles.trends}>
      <h4>Trending Topics</h4>
      <ul className={styles.list}>
        {trends.map((trend, i) => {
          return (
            <li key={i}>
              <span>
                <p className={styles.title}>{trend.title}</p>
                <p className={styles.amount}>
                  {format(Number(trend.postAmount))} posts
                </p>
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Homebar;
