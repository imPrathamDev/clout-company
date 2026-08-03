import HomePage from "@/components/pages/home";
import { getSiteMetadata } from "@/lib/metadata";
import { getArtifactCampaigns } from "@/sanity/queries/artifactCampaign";
import { getClientLogos } from "@/sanity/queries/clinetsLogo";
import { getAllCreators } from "@/sanity/queries/creators";

export const metadata = getSiteMetadata("/");

export default async function Home() {
  const [clientLogos, artifactCampaigns, creators] = await Promise.all([
    getClientLogos(),
    getArtifactCampaigns(),
    getAllCreators(),
  ]);
  return (
    <HomePage
      clientLogos={clientLogos}
      artifactCampaigns={artifactCampaigns}
      creators={creators}
    />
  );
}
