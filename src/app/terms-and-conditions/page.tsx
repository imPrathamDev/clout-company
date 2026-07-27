import LegalPageWrapper from "@/components/wrapper/legal";
import { getSiteMetadata } from "@/lib/metadata";
import React from "react";

export const metadata = getSiteMetadata("/terms-and-conditions");

function TAndC() {
  return (
    <LegalPageWrapper lastUpdated="July 27, 2026" title="Terms and Conditions">
      <p>
        Please read these terms and conditions carefully before using Our
        Service.
      </p>

      <h2>1. Acknowledgment</h2>
      <p>
        These are the Terms and Conditions governing the use of this Service and
        the agreement that operates between You and the Company. These Terms and
        Conditions set out the rights and obligations of all users regarding the
        use of the Service.
      </p>

      <h2>2. User Accounts</h2>
      <p>
        When You create an account with Us, You must provide Us information that
        is accurate, complete, and current at all times. Failure to do so
        constitutes a breach of the Terms, which may result in immediate
        termination of Your account on Our Service.
      </p>

      <h2>3. Intellectual Property</h2>
      <p>
        The Service and its original content, features, and functionality are
        and will remain the exclusive property of [Your Company Name] and its
        licensors. The Service is protected by copyright, trademark, and other
        laws of both the Country and foreign countries.
      </p>

      <h2>4. Limitation of Liability</h2>
      <p>
        Notwithstanding any damages that You might incur, the entire liability
        of the Company and any of its suppliers under any provision of this
        Terms and Your exclusive remedy for all of the foregoing shall be
        limited to the amount actually paid by You through the Service.
      </p>

      <h2>5. Contact Us</h2>
      <p>
        If you have any questions about these Legal Documents, You can contact
        us:
      </p>
      <ul>
        <li>By email: support@yourcompany.com</li>
        <li>
          By visiting this page on our website: www.yourcompany.com/contact
        </li>
      </ul>
    </LegalPageWrapper>
  );
}

export default TAndC;
