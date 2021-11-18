import React from "react";
import { peopleImage } from "../../assets/images";

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
      <section
        className={`${styles.section_1} flex flex-col items-center justify-center`}
      >
        <Header />
        <div className="container">
          <div className="grid grid-cols-12">
            <div className="col-span-12 lg:col-span-6 xl:col-span-5 mb-16">
              <div className={`${styles.banner_text} text-white mb-7`}>
                <span>A retirement </span>
                <div className={`${styles.solution_text} inline-block mr-5`}>
                  solution
                  <img src={YellowCrosses} alt="" />
                </div>
                <span>you can trust.</span>
              </div>
              <div>
                <p className="text-gray-450 text-lg">
                  Secure your future with a transparent and high yielding
                  interest pension plan that is truly yours.
                </p>
              </div>
              <div className="mt-10 lg:mt-16">
                <Button
                  className="font-medium "
                  onClick={() => alert("Coming Soon!")}
                >
                  Connect Wallet
                </Button>
              </div>
            </div>
            <div
              className={`col-span-12 lg:col-span-6 xl:col-span-7 ${styles.people_image_div}`}
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
          <div className={`my-12 xl:mt-0 xl:mb-12 ${styles.logos}`}>
            <div className="grid grid-cols-4 gap-x-6 md:gap-x-10 place-items-center place-content-between">
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
      <section className={`${styles.section_1} `}></section>
    </div>
  );
}

export { LandingPage };
