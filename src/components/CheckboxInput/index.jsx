import React from "react";
import { CheckBox } from "../../assets/svg";
import styles from "./checkbox.module.css";

function CheckboxInput({ isActive, onToggle }) {
  const activeClass = isActive ? `${styles["active"]}` : "";
  return (
    <button
      className={`${styles["container"]}`}
      onClick={(e) => {
        e.preventDefault();
        onToggle();
      }}
    >
      <CheckBox className={activeClass} />
    </button>
  );
}

export { CheckboxInput };
