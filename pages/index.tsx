import type { NextPage } from "next";
import Page from "../components/Page";
import { Posts } from "../components/Posts";

const Home: NextPage = () => {
  return (
    <Page title="Letzie" description="this is not a test">
      <Posts />
    </Page>
  );
};

export default Home;
