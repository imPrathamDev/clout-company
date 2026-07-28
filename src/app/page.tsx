import HomePage from "@/components/pages/home";
import { getSiteMetadata } from "@/lib/metadata";
import { getArtifactCampaigns } from "@/sanity/queries/artifactCampaign";
import { getClientLogos } from "@/sanity/queries/clinetsLogo";

export const metadata = getSiteMetadata("/");

export default async function Home() {
  const [clientLogos, artifactCampaigns] = await Promise.all([
    getClientLogos(),
    getArtifactCampaigns(),
  ]);
  return (
    <HomePage clientLogos={clientLogos} artifactCampaigns={artifactCampaigns} />
  );
}
