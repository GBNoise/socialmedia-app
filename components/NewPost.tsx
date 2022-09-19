import { useContext, useState, useRef } from "react";
import { KeyedMutator } from "swr";
import { authContext } from "../contexts/authContext";
import { useAxios } from "../hooks/useAxios";
import styles from "../styles/newpost.module.scss";

export const NewPost = ({ mutate }: { mutate: KeyedMutator<any> }) => {
  const { session } = useContext(authContext);
  const [textVal, setTextVal] = useState<string>("");
  const { instance: axios } = useAxios();
  const postRef = useRef<HTMLButtonElement>(null);

  const quotes: string[] = [
    "Any thoughts?",
    "Share your thoughts with your friends.",
    "You only live once, spit it out!",
    "The world is too big for you to doubt saying what you think.",
  ];

  const quote = quotes[Math.floor(Math.random() * quotes.length)];

  function handleChange(e: any) {
    if (e.nativeEvent.inputType === "insertLineBreak") {
      if (!postRef.current) return;
      postRef.current.click();
      return;
    }
    if (
      textVal.length >= 255 &&
      e.nativeEvent.inputType !== "deleteContentBackward"
    )
      return;

    setTextVal(e.currentTarget.value);
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const post = {
      ownerID: session.user.id,
      content: textVal,
    };
    axios
      .post("/posts", { post })
      .then((res) => mutate())
      .catch((e) => console.log(e));

    setTextVal("");
  };

  return (
    <form className={styles.newPost} onSubmit={handleSubmit}>
      <span className={styles.picture}></span>
      <textarea
        className={styles.text}
        placeholder={quote}
        value={textVal}
        onChange={handleChange}
        spellCheck={false}
      />
      <button ref={postRef}>POST</button>
      <p
        style={textVal.length >= 255 ? { color: "var(--pinkAccent)" } : {}}
        className={styles.quantity}
      >
        {textVal.length} / 255
      </p>
    </form>
  );
};
