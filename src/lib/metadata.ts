import type { Metadata } from "next";

// Define the valid routes for the application
type RoutePath =
  | "/"
  | "/source-code"
  | "/terms-and-conditions"
  | "/privacy-policy"
  | "/log"
  | "/contact";

export function getSiteMetadata(path: RoutePath): Metadata {
  const siteName = "The Clout Company";
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.thecloutcompany.com";

  // Base configuration shared across all pages
  const baseMetadata: Metadata = {
    metadataBase: new URL(baseUrl),
    authors: [{ name: "Crescent" }],
    creator: "Crescent",
    publisher: "The Clout Company",
    openGraph: {
      siteName,
      type: "website",
      locale: "en_US",
      images: "/assets/images/og/image.png",
    },
    twitter: {
      card: "summary_large_image",
      images: "/assets/images/og/image.png",
    },
  };

  switch (path) {
    case "/":
      return {
        ...baseMetadata,
        title: `${siteName} | The Distribution OS for Consumer Companies`,
        description:
          "The Clout Company by Crescent engineers systems to enable distribution at internet scale from first launch to global adoption. Over 159 billion users acquired via Clout OS.",
        openGraph: {
          ...baseMetadata.openGraph,
          title: `${siteName} | The Distribution OS for Consumer Companies`,
          description:
            "We program distribution for businesses that love building. Clout orchestrates every layer of internet-native distribution to help products reach the right users at the right time.",
          url: baseUrl,
        },
      };

    case "/source-code":
      return {
        ...baseMetadata,
        title: `Source Code | ${siteName}`,
        description:
          "Discover the source code behind The Clout Company. We engineer distribution at internet scale, turning spectators into builders and helping great products find the people they are meant for.",
        openGraph: {
          ...baseMetadata.openGraph,
          title: `Source Code - About Us | ${siteName}`,
          description:
            "Great products are built every day, but few find their audience. Learn how The Clout Company programs distribution for businesses that love building.",
          url: `${baseUrl}/about`,
        },
      };

    case "/terms-and-conditions":
      return {
        ...baseMetadata,
        title: `Terms & Conditions | ${siteName}`,
        description:
          "Read the terms and conditions for using The Clout Company and Clout OS services, tools, and systems.",
        openGraph: {
          ...baseMetadata.openGraph,
          title: `Terms & Conditions | ${siteName}`,
          description:
            "Read the terms and conditions for using The Clout Company.",
          url: `${baseUrl}/terms-and-conditions`,
        },
      };

    case "/privacy-policy":
      return {
        ...baseMetadata,
        title: `Privacy Policy | ${siteName}`,
        description:
          "Learn how The Clout Company protects your data and privacy across our Distribution OS and platforms.",
        openGraph: {
          ...baseMetadata.openGraph,
          title: `Privacy Policy | ${siteName}`,
          description:
            "Privacy and data protection policies for The Clout Company.",
          url: `${baseUrl}/privacy-policy`,
        },
      };

    case "/log":
      return {
        ...baseMetadata,
        title: `Logs | ${siteName}`,
        description:
          "Read the latest articles and insights from The Clout Company. Explore our Logs to learn how we program distribution and help great products find their users.",
        openGraph: {
          ...baseMetadata.openGraph,
          title: `Logs | ${siteName}`,
          description:
            "Read the latest articles and insights from The Clout Company. Explore our Logs to learn how we program distribution and help great products find their users.",
          url: `${baseUrl}/log`,
        },
      };

    case "/contact":
      return {
        ...baseMetadata,
        title: `Contact | ${siteName}`,
        description:
          "Get in touch with The Clout Company. Reach out to our team to learn how we program distribution and help your great product find its perfect users.",
        openGraph: {
          ...baseMetadata.openGraph,
          title: `Contact | ${siteName}`,
          description:
            "Get in touch with The Clout Company. Reach out to our team to learn how we program distribution and help your great product find its perfect users.",
          url: `${baseUrl}/log`,
        },
      };
    default:
      return baseMetadata;
  }
}
