import { type SchemaTypeDefinition } from "sanity";

import { categoryType } from "./categoryType";
import { postType } from "./postType";
import clinetsType from "./clinetsType";
import artifactType from "./artifactType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [categoryType, postType, clinetsType, artifactType],
};
