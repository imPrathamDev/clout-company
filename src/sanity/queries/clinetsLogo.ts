import { client } from "../lib/client";

// Define the TypeScript interface for the expected result
export interface ClientLogo {
  _id: string;
  name: string;
  logoUrl: string;
}

/**
 * Fetches all client logos from Sanity
 */
export async function getClientLogos(): Promise<ClientLogo[]> {
  // GROQ query to get the documents and resolve the image URL
  const query = `*[_type == "clientLogo"] | order(_createdAt desc) {
    _id,
    name,
    "logoUrl": logo.asset->url
  }`;

  try {
    const logos = await client.fetch<ClientLogo[]>(query);
    return logos;
  } catch (error) {
    console.error("Error fetching client logos:", error);
    return [];
  }
}
