import React from "react";
import { useRouter } from "next/router";
import Page from "../../components/Page";
import { useAxios } from "../../hooks/useAxios";
import useSwr from "swr";
import { Loading } from "../../components/Loading";

const Profile = () => {
  const router = useRouter();
  const { username } = router.query;
  const axios = useAxios();

  const fetcher = (url: string) => axios.get(url).then((res) => res.data);

  const { data, error } = useSwr(`/api/users/profile/${username}`, fetcher);

  if (!data) return <Loading />;

  return (
    <Page title={username + "'s Profile"} description={""}>
      <h1>Profile of {username}</h1>
      <span>{data && JSON.stringify(data)}</span>
    </Page>
  );
};

export default Profile;
