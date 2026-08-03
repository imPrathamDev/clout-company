import { type SchemaTypeDefinition } from "sanity";

import { categoryType } from "./categoryType";
import { postType } from "./postType";
import clinetsType from "./clinetsType";
import artifactType from "./artifactType";
import { creator } from "./creatorTypes";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [categoryType, postType, clinetsType, artifactType, creator],
};
