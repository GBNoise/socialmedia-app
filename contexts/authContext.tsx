import React, { createContext } from "react";
import { useSession } from "next-auth/react";
interface initialValueProps {
  session: any;
  status: "authenticated" | "loading" | "unauthenticated";
}

export const authContext = createContext({} as initialValueProps);

const AuthContext: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { data: session, status } = useSession();

  return (
    <authContext.Provider value={{ session, status }}>
      {children}
    </authContext.Provider>
  );
};

export default AuthContext;
