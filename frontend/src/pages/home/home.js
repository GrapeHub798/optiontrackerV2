import "./home.css";

import React from "react";

import About from "./sections/about";
import CallToAction from "./sections/calltoaction";
import Features from "./sections/features";
import Metrics from "./sections/metrics";

export const Home = () => {
  return (
    <>
      <About />
      <Features />
      <Metrics />
      <CallToAction />
    </>
  );
};
