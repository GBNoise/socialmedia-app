import React, { useContext } from "react";
import { modalContext } from "../contexts/modalContext";
import styles from "../styles/modal.module.scss";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const Modal = () => {
  const { state, dispatch } = useContext(modalContext);

  const closeModal = () => {
    dispatch({ type: "setMessage", title: "" });
  };

  return (
    <div className={styles.modal}>
      <span className={styles.content}>
        <h2>{state.title}:</h2>
        {state.message && <p>{state.message}</p>}
      </span>
      <button onClick={closeModal}>
        <FontAwesomeIcon icon={faXmark} />
      </button>
    </div>
  );
};
