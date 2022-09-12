import "../styles/globals.scss";
import type { AppProps } from "next/app";
import Nav from "../components/Nav";
import Sidebar from "../components/Sidebar";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { NO_SIDEBAR_ROUTES } from "../constants";
import AuthContext from "../contexts/authContext";
import { SessionProvider } from "next-auth/react";
import { ModalProvider } from "../contexts/modalContext";

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", "dark");
  }, []);

  const router = useRouter();
  const { pathname } = router;

  return (
    <ModalProvider>
      <SessionProvider>
        <AuthContext>
          <Nav />
          <main>
            {NO_SIDEBAR_ROUTES.includes(pathname) || <Sidebar />}
            <Component {...pageProps} />
          </main>
        </AuthContext>
      </SessionProvider>
    </ModalProvider>
  );
}

export default MyApp;
