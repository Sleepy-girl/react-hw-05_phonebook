import React from "react";
import styles from "./filter.module.css";
import stylesFromForm from "../contactForm/contactForm.module.css";

function Filter({ getFilterValue, value }) {
  return (
    <div className={styles.wrapperFilter}>
      <label className={stylesFromForm.label}>
        Find contacts by name:
        <input
          type="text"
          name="filter"
          onChange={getFilterValue}
          value={value}
          className={stylesFromForm.input}
        />
      </label>
    </div>
  );
}

export default Filter;
