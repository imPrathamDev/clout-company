import HomePage from "@/components/pages/home";
import { getSiteMetadata } from "@/lib/metadata";
import { getClientLogos } from "@/sanity/queries/clinetsLogo";

export const metadata = getSiteMetadata("/");

export default async function Home() {
  const clientLogos = await getClientLogos();
  return <HomePage clientLogos={clientLogos} />;
}
