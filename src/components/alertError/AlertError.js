import React from "react";
import styles from "./alertError.module.css";
import { CSSTransition } from "react-transition-group";

function AlertError({ closeAlert, alert }) {
  return (
    <CSSTransition classNames={styles} in={alert} timeout={250} unmountOnExit>
      <div className={styles.alert} onClick={closeAlert}>
        <span className={styles.message}>Contact already exists!</span>
      </div>
    </CSSTransition>
  );
}

export default AlertError;
