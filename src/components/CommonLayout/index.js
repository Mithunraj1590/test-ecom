
import MainHeader from "@/components/Header";
import Footer from "@/components/Footer";

import React from "react";

const CommonLayout = ({ children }) => {
  return (
    <main className="MainWrap">
      <MainHeader />
      {/* <PageTransition duration="0.8s" easing="cubic-bezier(0.25, 0.1, 0.25, 1)"> */}
      {children}
      {/* </PageTransition> */}
      <Footer />
    </main>
  );
};

export default CommonLayout;
