import ContactPage from "@/components/pages/contact";
import { getSiteMetadata } from "@/lib/metadata";
import React from "react";

export const metadata = getSiteMetadata("/contact");

function Contact() {
  return <ContactPage />;
}

export default Contact;
