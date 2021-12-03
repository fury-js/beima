import React from "react";
import styles from "./input-group.module.css";

function InputGroup({
  type,
  onClick,
  label,
  className,
  name,
  formik,
  children: prefix,
  ...rest
}) {
  const error = formik?.touched[name] && formik?.errors?.[name];
  let classes = `${styles.container} ${className} `;
  if (error) classes += styles["error"];
  let placeholder = rest?.placeholder;

  if (formik) {
    Object.assign(rest, {
      onChange: formik?.handleChange,
      onBlur: formik?.handleBlur,
      value: formik?.values[name],
    });
  }
  return (
    <div className={classes}>
      {label && (
        <label className="mb-2" htmlFor={name}>
          {label}
        </label>
      )}
      <div className={`${styles["group"]}`}>
        {prefix}
        <input
          id={name}
          name={name}
          type={type}
          onClick={onClick}
          error={error}
          {...rest}
          placeholder={placeholder}
        />
      </div>
      {error && <div className={`${styles["error-message"]}`}>{error}</div>}
    </div>
  );
}

export { InputGroup };
