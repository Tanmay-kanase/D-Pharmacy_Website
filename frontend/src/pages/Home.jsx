import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import ContactUs from "../components/Contactus";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <ContactUs />
    </div>
  );
}
