import { useRouter } from "next/router";
import React, { useContext, useLayoutEffect } from "react";
import { authContext } from "../contexts/authContext";

interface AuthProtectedRouteProps {
  children: React.ReactNode;
}

export const AuthProtectedRoute: React.FC<AuthProtectedRouteProps> = ({
  children,
}) => {
  const { session, status } = useContext(authContext);
  const router = useRouter();

  useLayoutEffect(() => {
    if (status === "loading") return;
    if (status === "unauthenticated") router.push("/auth?action=login");
  }, [status, router]);

  return session ? <>{children}</> : <></>;
};
