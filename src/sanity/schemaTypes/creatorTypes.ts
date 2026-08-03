// schemas/creator.ts
import { defineField, defineType } from "sanity";

export const creator = defineType({
  name: "creator",
  title: "Creator",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "profilePicture",
      title: "Profile Picture",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "reelLink",
      title: "Reel Link",
      type: "url",
      validation: (Rule) => Rule.required().uri({ scheme: ["http", "https"] }),
    }),
  ],
  preview: {
    select: {
      title: "name",
      media: "profilePicture",
    },
  },
});
