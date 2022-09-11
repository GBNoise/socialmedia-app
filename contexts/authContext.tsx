import React, { createContext } from "react";
import { useSession } from "next-auth/react";
interface initialValueProps {
  session: any;
}

export const authContext = createContext({} as initialValueProps);

const AuthContext: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { data: session } = useSession();

  return (
    <authContext.Provider value={{ session }}>{children}</authContext.Provider>
  );
};

export default AuthContext;
