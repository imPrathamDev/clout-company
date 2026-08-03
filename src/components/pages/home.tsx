import React from "react";
import Hero from "../home/hero";
import HeroDivider from "../home/hero-divider";
import Navbar from "../nav/nav-bar";
import Clients from "../home/clients";
import OrgWheel from "../home/org-wheel";
import Wheel from "../home/wheel";
import { BookCard } from "../home/card";
import WordSearchReveal from "../home/word-search-reveal";
import Footer from "../footer";
import Artifacts from "../home/artifacts";
import SocialMediaFlowChart from "../home/social-media-flow-chart";
import SocialPlatforms from "../home/social-platforms";
import { ClientLogo } from "@/sanity/queries/clinetsLogo";
import { ArtifactCampaign } from "@/sanity/queries/artifactCampaign";
import { Creator } from "@/sanity/queries/creators";
import Talents from "../home/talents";

function HomePage({
  clientLogos,
  artifactCampaigns,
  creators,
}: {
  clientLogos: ClientLogo[];
  artifactCampaigns: ArtifactCampaign[];
  creators: Creator[];
}) {
  return (
    <main className="overflow-x-clip">
      <Navbar />
      <Hero />
      <HeroDivider />
      <Clients clientLogos={clientLogos} />
      <Wheel />
      <Artifacts artifactCampaigns={artifactCampaigns} />
      <Talents creators={creators} />
      <SocialPlatforms />
      <WordSearchReveal />
      <Footer />
    </main>
  );
}

export default HomePage;
