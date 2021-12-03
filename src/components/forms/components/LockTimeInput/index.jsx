import React from "react";
import { greenCalenderSvg } from "../../../../assets/svg";
import styles from "./lock-time-input.module.css";

function LockTimeInput({
  onClick,
  label,
  className,
  name,
  formik,
  children: prefix,
  ...rest
}) {
  const error = formik?.touched[name] && formik?.errors?.[name];
  const value = formik?.values?.["lockTime"]
  let classes = `${styles.container} ${className} `;
  if (error) classes += styles["error"];

  if (formik) {
    Object.assign(rest, {
      onChange: formik?.handleChange,
      onBlur: formik?.handleBlur,
      value: formik?.values[name],
    });
  }

  const noOfMonths = formik?.values["lockTime"];
  const maturityDate = new Date(
    new Date().getTime() + noOfMonths * 30 * 24 * 60 * 60 * 1000
  ).toLocaleDateString();

  const isAllowed = !error && value > 0

  return (
    <div className={classes}>
      {label && (
        <label className="mb-2" htmlFor={name}>
          {label}
        </label>
      )}
      <div className="grid grid-cols-7  ">
        <div className={`col-span-7 lg:col-span-3 lg:pr-4 h-full`}>
          <div className={`${styles["group"]}`}>
            <span className={`${styles["calender"]} p-4`}>
              <img src={greenCalenderSvg} alt="" />
            </span>
            <input
              type="number"
              id="lockTime"
              name="lockTime"
              onClick={onClick}
              error={error}
              {...rest}
            />
          </div>
        </div>
        <div
          className={`${styles["info-msg"]} py-2 px-8 col-span-7 lg:col-span-4 mt-2 lg:mt-0 flex items-center`}
        >
          {!isAllowed ? (
            "Please Select a specified number of months."
          ) : (
            <div>
              You will be eligible to withdraw from{" "}
              <span className={`${styles["maturity-date"]}`}>
                {maturityDate}
              </span>
            </div>
          )}
        </div>
      </div>
      {error && <div className={`${styles["error-message"]}`}>{error}</div>}
    </div>
  );
}

export default LockTimeInput;
