import LegalPageWrapper from "@/components/wrapper/legal";
import { getSiteMetadata } from "@/lib/metadata";
import React from "react";

export const metadata = getSiteMetadata("/privacy-policy");

function PrivacyPolicy() {
  return (
    <LegalPageWrapper lastUpdated="27 July 2026" title="Privacy Policy">
      <p>
        Welcome to [Your Company Name]. We respect your privacy and are
        committed to protecting your personal data. This privacy policy will
        inform you as to how we look after your personal data when you visit our
        website and tell you about your privacy rights.
      </p>

      <h2>1. Information We Collect</h2>
      <p>
        We may collect, use, store, and transfer different kinds of personal
        data about you, which we have grouped together as follows:
      </p>
      <ul>
        <li>
          <strong>Identity Data:</strong> includes first name, last name,
          username, or similar identifier.
        </li>
        <li>
          <strong>Contact Data:</strong> includes email address and telephone
          numbers.
        </li>
        <li>
          <strong>Technical Data:</strong> includes internet protocol (IP)
          address, browser type and version, time zone setting, and operating
          system.
        </li>
      </ul>

      <h2>2. How We Use Your Data</h2>
      <p>
        We will only use your personal data when the law allows us to. Most
        commonly, we will use your personal data in the following circumstances:
      </p>
      <ul>
        <li>To provide and maintain our Service.</li>
        <li>To notify you about changes to our Service.</li>
        <li>To provide customer support.</li>
      </ul>

      <h2>3. Data Security</h2>
      <p>
        We have put in place appropriate security measures to prevent your
        personal data from being accidentally lost, used, or accessed in an
        unauthorized way, altered, or disclosed.
      </p>
    </LegalPageWrapper>
  );
}

export default PrivacyPolicy;
