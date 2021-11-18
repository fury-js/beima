import React from "react";
import styles from "./button.module.css";

function Button({ text, children, className, onClick, ...rest }) {
  let containerClass = styles.container;
  if (containerClass) containerClass += ` ${className}`;
  return (
    <button
      onClick={
        onClick ??
        (() => alert("You clicked a button but it doesn't do anything yet!"))
      }
      className={containerClass}
      {...rest}
    >
      {text || children}
    </button>
  );
}

export { Button };
