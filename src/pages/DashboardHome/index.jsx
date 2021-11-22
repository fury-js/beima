import React, { useEffect } from "react";
import { useLoadingContext } from "../../contexts/loadingContext";
import { useToastContext } from "../../contexts/toastContext";
import styles from "./dashboard-home.module.css";

function DashboardHome(props) {
  const { toast } = useToastContext();
  const { setIsLoading } = useLoadingContext();
  useEffect(() => {
    // toast.success("Your transaction has been approved successfully.");
  });
  return (
    <div className={`${styles["container"]} container`}>
      Hello Dashboard Home!
    </div>
  );
}

export { DashboardHome };
