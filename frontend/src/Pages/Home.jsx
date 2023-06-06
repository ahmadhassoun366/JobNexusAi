import React from "react";
import Header from "../Components/Header";
import Banner from "../Components/Banner";
import Footer from "../Components/Footer";
import Team from '../Shared/Team';
import Contact from '../Shared/Contact';
import Hero from '../Shared/Hero';
import Tips from '../Shared/Tips';
import About from '../Shared/About';
import Services from '../Shared/Services';

export default function Landing() {
  return (
    <>
      <Header/>
      <Banner />
      <Hero/>
      <Tips/>
      <About/>
      <Team/>
      <Services/>
      <Contact/>
      <Footer />
    </>
  );
}