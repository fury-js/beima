import { useToastContext } from "../../contexts/toastContext";
import styles from "./toasts.module.css";
import { useEffect } from "react";
import { failureTickSvg, greenBubblesSvg, redBubblesSvg, successTickSvg } from "../../assets/svg";
import { CloseButton } from "..";

function Toast() {
  const { toastType, toastMessage, isDisplayingToast, setIsDisplayingToast } =
    useToastContext();

  const bgImages = {
    success: greenBubblesSvg,
    error: redBubblesSvg,
  };

  const ticks = {
    success: successTickSvg,
    error: failureTickSvg,
  };

  const containerClass = (() => {
    if (!isDisplayingToast)
      return `${styles["container"]} ${styles[toastType]}`;

    return `${styles["container"]} ${styles[toastType]} ${styles["active"]}`;
  })();

  useEffect(() => {
    if (!isDisplayingToast) return;
    setTimeout(() => {
      if (!isDisplayingToast) return;
      setIsDisplayingToast(false);
    }, 3000);
  }, [isDisplayingToast, setIsDisplayingToast]);

  return (
    <div className={containerClass}>
      <CloseButton onClick={() => setIsDisplayingToast(false)} />
      <div className="grid grid-cols-6">
        <div className={`${styles["tick-img"]} col-span-1`}>
          <img src={ticks[toastType]} alt="" />
        </div>
        <div className={`${styles["bg-img"]} col-span-1`}>
          <img src={bgImages[toastType]} alt="" />
        </div>
        <div className={`${styles["content"]} col-span-5`}>
          <p className={`${styles["heading"]} mb-2`}>{toastType}</p>
          <p className={`${styles["message"]}`}>{toastMessage}</p>
        </div>
      </div>
    </div>
  );
}

export { Toast };
