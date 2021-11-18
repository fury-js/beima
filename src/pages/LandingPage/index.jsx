import React from "react";
import { mapImage, peopleImage } from "../../assets/images";

import {
  airbnbLogo,
  CircleLoader,
  googleLogo,
  hubspotLogo,
  microsoftLogo,
  YellowCrosses,
} from "../../assets/svg";

import { Button, Header } from "../../components";
import styles from "./landing-page.module.css";

function LandingPage(props) {
  return (
    <div className={`${styles.container}`}>
      <Header />
      <section
        className={`${styles.section_1} flex flex-col items-center justify-center`}
      >
        <div className="container">
          <div className="grid grid-cols-12">
            <div className="col-span-12 lg:col-span-6 xl:col-span-5 lg:mb-16">
              <div className={`${styles.banner_text} text-white mb-10`}>
                <span>A retirement </span>
                <div className={`${styles.solution_text} inline-block mr-5`}>
                  solution
                  <img src={YellowCrosses} alt="" />
                </div>
                <span>you can trust.</span>
              </div>
              <div>
                <p className="text-gray-450 text-base md:text-lg">
                  Secure your future with a transparent and high yielding
                  interest pension plan that is truly yours.
                </p>
              </div>
              <div className="mt-16 mb-10">
                <Button className="font-medium">Connect Wallet</Button>
              </div>
            </div>
            <div
              className={`mt-16 pt-3 lg:mt-0 col-span-12 lg:col-span-6 xl:col-span-7 ${styles.people_image_div}`}
            >
              <img src={peopleImage} alt="" />
            </div>
          </div>
        </div>
        <div
          className={`${styles.pension_earnings} hidden xl:inline-flex flex-col items-center justify-center`}
        >
          <div className="flex items-center justify-center">
            <CircleLoader />
            <span className="absolute text-sm">100%</span>
          </div>
          <p className="mt-6">Pension Earnings</p>
        </div>
        <div className="container">
          <div className={`my-6 xl:mt-0 xl:mb-12 ${styles.logos}`}>
            <div className="grid grid-cols-4 gap-x-6 lg:gap-x-10 place-items-center place-content-between">
              <div className="m x-16 col-span-1">
                <img src={airbnbLogo} alt="" />
              </div>
              <div className="m x-16 col-span-1">
                <img src={hubspotLogo} alt="" />
              </div>
              <div className="m x-16 col-span-1">
                <img src={googleLogo} alt="" />
              </div>
              <div className="m x-16 col-span-1">
                <img src={microsoftLogo} alt="" />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className={`${styles.section_2} `}>
        <div className="container overflow-hidden">
          <div className="lg:mt-10 grid grid-cols-12 py-10 md:py-16">
            <div className="col-span-12 lg:col-span-5 xl:col-span-4 mb-16">
              <div className={`${styles["header-text"]} text-white mb-10`}>
                Our users are all over the world with wide coverage.
              </div>
              <div className="mb-10">
                <p className="text-gray-450 text-base md:text-lg">
                  Our platform reaches people all over the world, hereby we are
                  trusted as the best platform for pension and retirement plan.
                </p>
              </div>
              <div className="grid grid-cols-3 gap-x-8">
                <div>
                  <div className="flex mb-2 items-baseline">
                    <span className={`${styles["big-number"]} mr-2`}>20</span>
                    <span className="text-gray-450 text-xs">Users</span>
                  </div>
                  <span className="text-xs md:text-sm text-gray-450">
                    Outside Africa
                  </span>
                </div>
                <div>
                  <div className="flex mb-2 items-baseline">
                    <span className={`${styles["big-number"]} mr-2`}>20</span>
                    <span className="text-gray-450 text-xs">Users</span>
                  </div>
                  <span className="text-xs md:text-sm text-gray-450">
                    Around Africa
                  </span>
                </div>
                <div>
                  <div className="flex mb-2 items-baseline">
                    <span className={`${styles["big-number"]} mr-2`}>150</span>
                    <span className="text-gray-450 text-xs">Users</span>
                  </div>
                  <span className="text-xs md:text-sm text-gray-450">
                    Within Nigeria
                  </span>
                </div>
              </div>
            </div>
            <div
              className={`${styles["map-image-container"]} col-span-12 lg:col-span-7 xl:col-span-8 `}
            >
              <img src={mapImage} alt="Map of active users" />
            </div>
          </div>
        </div>
      </section>
      <section className={`${styles.section_3} `}>
        <div className="container overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 grid-rows-2 gap-10 py-10 md:py-16">
            <div className={`col-1 ${styles["title-container"]}`}>
              <div className={`${styles["header-text"]} text-white mb-10`}>
                Getting Started
              </div>
              <div className="mb-10">
                <p className="text-gray-450 text-base md:text-lg">
                  Get in touch with the best choice for your pension plan,
                  <br /> with the various super friendly services we offer.
                </p>
              </div>
            </div>
            <div className={`order-2 md:order-1 col-1 p-6 ${styles["cards"]}`}>
              <div className="flex gap-7 ">
                <div className={`${styles["start-numbers"]} mr-5 md:mr-0`}>
                  <span>2</span>
                </div>
                <div className="flex flex-col justify-center">
                  <p className="mb-5">Select a retirement plan</p>
                  <p className={`${styles["card-details"]}`}>
                    Select a percentage, funding interval and a lock-up period
                    for your funds to setup a plan.
                  </p>
                </div>
              </div>
            </div>
            <div className={`order-1 md:order-2 col-1 p-6 ${styles["cards"]}`}>
              <div className="flex gap-7 ">
                <div className={`${styles["start-numbers"]} mr-5 md:mr-0`}>
                  <span>1</span>
                </div>
                <div className="flex flex-col justify-center">
                  <p className="mb-5">Register on the platform</p>
                  <p className={`${styles["card-details"]}`}>
                    Create an employee account with your name, email address,
                    details of next of kin, payment information and a wallet
                    address.
                  </p>
                </div>
              </div>
            </div>
            <div className={`order-3 md:order-3 col-1 p-6 ${styles["cards"]}`}>
              <div className="flex gap-7 ">
                <div className={`${styles["start-numbers"]} mr-5 md:mr-0`}>
                  <span>3</span>
                </div>
                <div className="flex flex-col justify-center">
                  <p className="mb-5">Activate your plan</p>
                  <p className={`${styles["card-details"]}`}>
                    Fund your wallet to activate your retirement.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export { LandingPage };
