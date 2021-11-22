import React from "react";
import { BalanceCard } from "../../components/Cards/BalanceCard";
import { DashboardLayout } from "../../layouts/dashboard";
import styles from "./dashboard-home.module.css";
import {
  totalBalSvg,
  pensionSvg,
  totalSvg,
  pensionDueSvg,
} from "../../assets/svg";
import {
  lockImage,
  barchartImage,
  cubeImage,
  piechartImage,
} from "../../assets/images";
import { PensionsCard } from "../../components/Cards/PensionsCard";
import { Header } from "../../components";

function DashboardHome(props) {
  // Constants
  const pensionCards = [
    { text: "Retirement plan", icon: "../../../assets/svg/lock.png" },
    { text: "10yrs plan", icon: "../../../assets/svg/lock.png" },
    { text: "3yrs plan", icon: "../../../assets/svg/lock.png" },
    { text: "Flexible time plan", icon: "../../../assets/svg/lock.png" },
  ];

  return (
    <DashboardLayout>
      <Header />
      <div className={`${styles["container"]} container py-5`}>
        <h1 className={styles.pageText + " text-white mb-8"}>Dashboard</h1>
        <div className="grid grid-cols-6 gap-4">
          <div className="col-span-6 md:col-span-3 lg:col-span-2">
            <BalanceCard
              type="totalBal"
              headText="Total balance"
              amount="$131,810.16"
              Icon={totalBalSvg}
            />
          </div>
          <div className="col-span-6 md:col-span-3 lg:col-span-2">
            <BalanceCard
              type="outline"
              headText="Pension balance"
              amount="$84,605.74"
              Icon={pensionSvg}
            />
          </div>
          <div className="col-span-6 md:col-span-3 lg:col-span-2">
            <BalanceCard
              type="outline"
              headText="Total interest"
              amount="$84,605.74"
              Icon={totalSvg}
            />
          </div>
        </div>
      </div>
      <div className={`${styles["container"]} container py-14`}>
        <h4 className="text-white mb-5">Pension plans</h4>
        <div className="grid grid-cols-4 gap-4">
          <div className="col-span-4 md:col-span-2 lg:col-span-1">
            <PensionsCard Icon={lockImage} text="Retirement plan" />
          </div>
          <div className="col-span-4 md:col-span-2 lg:col-span-1">
            <PensionsCard Icon={cubeImage} text="10yrs plan" />
          </div>
          <div className="col-span-4 md:col-span-2 lg:col-span-1">
            <PensionsCard Icon={piechartImage} text="3yrs plan" />
          </div>
          <div className="col-span-4 md:col-span-2 lg:col-span-1">
            <PensionsCard Icon={barchartImage} text="Flexible time plan" />
          </div>
        </div>
      </div>
      <div
        className={styles.viewArea + " grid grid-cols-3 gap-4 container py-5"}
      >
        <div className={styles.plannerCard + " col-span-3 lg:col-span-2"}></div>
        <div
          className={
            styles.dueCard + " col-span-3 lg:col-span-1 flex flex-col p-5"
          }
        >
          <img src={pensionDueSvg} />
          <h5>Pension Due</h5>
          <p className="my-3">
            Your closest accured pension will be due in <span>3yrs</span>
          </p>
          <button className="ml-auto">View</button>
        </div>
      </div>
    </DashboardLayout>
  );
}

export { DashboardHome };
