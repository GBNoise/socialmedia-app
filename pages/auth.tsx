import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import Page from "../components/Page";
import styles from "../styles/auth.module.scss";
import Link from "next/link";
import { IconDefinition } from "@fortawesome/fontawesome-common-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faGoogle,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { faMailForward } from "@fortawesome/free-solid-svg-icons";
import { signIn } from "next-auth/react";
import { useAxios } from "../hooks/useAxios";

declare type AuthOptionsType = {
  name: string;
  icon: IconDefinition;
  onClick: Function;
};

const Auth = () => {
  return (
    <Page
      className={styles.authPageContainer}
      title={"Create account"}
      description={"somedesc"}
      adjust={false}
    >
      <AuthInformation />
      <AuthOptions />
    </Page>
  );
};

const AuthInformation = () => {
  return (
    <div className={styles.authInfo}>
      <span>
        <Logo />
        <h3>
          Dive in this brand new <p>experience</p> with many other users from
          around the <p>world</p>!
        </h3>
      </span>
    </div>
  );
};

const AuthOptions = () => {
  const router = useRouter();
  const { action } = router.query;
  const listRef = useRef<HTMLUListElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const changeRef = useRef<HTMLParagraphElement>(null);
  const options: AuthOptionsType[] = [
    { name: "Google", icon: faGoogle, onClick: () => undefined },
    { name: "Facebook", icon: faFacebook, onClick: () => undefined },
    { name: "Twitter", icon: faTwitter, onClick: () => undefined },
    { name: "Email", icon: faMailForward, onClick: () => handleEmail() },
  ];
  const [isEmail, setIsEmail] = useState<boolean>(false);

  const handleEmail = () => {
    if (!listRef.current || !titleRef.current || !changeRef.current) return;
    listRef.current.style.transform = "translateX(-1000px)";

    if (window.innerWidth <= 768) {
      titleRef.current.style.transform = "translateY(-200px)";
    } else {
      titleRef.current.style.transform = "translateY(-50px)";
      changeRef.current.style.transform = "translateY(45px)";
    }

    setIsEmail(true);
  };

  useEffect(() => {
    if (!listRef.current || !titleRef.current || !changeRef.current) return;
    if (!isEmail) {
      listRef.current.style.transform = "";
      titleRef.current.style.transform = "";
      changeRef.current.style.transform = "";
    }
  }, [isEmail]);

  return (
    <div className={styles.authOptions}>
      <h1 ref={titleRef}>
        {action === "create" ? "Begin your journey!" : "Log into your account"}
      </h1>
      <ul ref={listRef}>
        {options.map(({ name, icon, onClick }) => {
          return (
            <li data-theme={name} key={name} onClick={() => onClick()}>
              <FontAwesomeIcon icon={icon} className={styles.authIcon} />
              <p>Continue with {name}</p>
            </li>
          );
        })}
      </ul>
      <Link
        href={
          action === "create" ? "/auth?action=login" : "/auth?action=create"
        }
        className={styles.change}
      >
        <p ref={changeRef}>
          {action === "create"
            ? "Already have an account?"
            : "Do not have an account?"}
        </p>
      </Link>
      <span className={styles.disclaimers}>
        By clicking continue and creating an account, you agree to our{" "}
        <Link href="/terms-of-service">Terms of Service</Link>,{" "}
        <Link href="/privacy-policy">Privacy Policy</Link> and{" "}
        <Link href="/payment-policy">Payment Policy</Link>.
      </span>
      {isEmail && <EmailForm setIsEmail={setIsEmail} />}
    </div>
  );
};

const EmailForm = ({ setIsEmail }: any) => {
  const axios = useAxios();
  const router = useRouter();
  const { action } = router.query;
  const [fields, setFields] = useState({
    email: "",
    username: "",
    password: "",
    repeat: "",
  });
  const handleHide = () => {
    setIsEmail(false);
  };

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const name = e.currentTarget.name;
    const value = e.currentTarget.value;
    setFields({ ...fields, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (action === "login" || !action) {
      signIn("credentials", { ...fields, redirect: false }).then(
        ({ ok, error }: any) => {
          if (ok) router.push("/");
          if (error) {
            console.log(error);
          }
        }
      );
    }

    if (action === "create") {
      await axios
        .post("/api/users", { user: fields })
        .then((response) => {
          const { status: code, data: payload } = response;
          if (code === 201) router.push("/auth?action=login");
        })
        .catch((e) => {
          const { status: code, data: payload } = e.response;
        });
    }

    setFields({
      email: "",
      username: "",
      password: "",
      repeat: "",
    });
  };

  return (
    <form className={styles.emailForm} onSubmit={handleSubmit}>
      {action === "create" && (
        <label>
          Email
          <input
            type="email"
            placeholder="Enter your email"
            value={fields.email}
            name="email"
            onChange={handleChange}
            required
          />
        </label>
      )}
      <label>
        Username
        <input
          type="text"
          placeholder="Enter your username"
          value={fields.username}
          name="username"
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Password
        <input
          type="password"
          placeholder="Enter your password"
          value={fields.password}
          name="password"
          onChange={handleChange}
          pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"
          required
          onInvalid={(e) =>
            e.currentTarget.setCustomValidity(
              "Password must be at least 8 characters long and contain at least one letter and one number"
            )
          }
          onInput={(e) => e.currentTarget.setCustomValidity("")}
        />
      </label>
      {action === "create" && (
        <label>
          Repeat Password
          <input
            type="password"
            placeholder="Repeat your password"
            value={fields.repeat}
            name="repeat"
            onChange={handleChange}
            required
          />
        </label>
      )}
      <button type="submit">{action === "create" ? "Create" : "Login"}</button>
      <p onClick={handleHide}>use a different method</p>
    </form>
  );
};

const Logo = () => (
  <Link href="/">
    <h2 className={styles.logo}>Letzie</h2>
  </Link>
);

export default Auth;
