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
import { SettingsProvider } from "../contexts/settings/settingsContext";
import { HotkeysProvider } from "../contexts/hotkeysContext";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const { pathname } = router;

  return (
    <HotkeysProvider>
      <SettingsProvider>
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
      </SettingsProvider>
    </HotkeysProvider>
  );
}

export default MyApp;
