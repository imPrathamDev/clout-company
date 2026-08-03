import { groq } from "next-sanity";
import type { Image } from "sanity";
import { client } from "../lib/client";

export interface Creator {
  _id: string;
  name: string;
  profilePicture: Image; // raw image object with asset._ref
  reelLink: string;
}

const CREATORS_QUERY = groq`
  *[_type == "creator"] {
    _id,
    name,
    profilePicture,
    reelLink
  }
`;

export async function getAllCreators(): Promise<Creator[]> {
  return client.fetch<Creator[]>(CREATORS_QUERY);
}
