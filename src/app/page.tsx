import HomePage from "@/components/pages/home";
import { getSiteMetadata } from "@/lib/metadata";

export const metadata = getSiteMetadata("/");

export default function Home() {
  return <HomePage />;
}
