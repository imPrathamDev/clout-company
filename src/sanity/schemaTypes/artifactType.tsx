import { defineField, defineType } from "sanity";

export default defineType({
  name: "artifactCampaign",
  title: "Artifact Campaign",
  type: "document",
  fields: [
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      description: 'e.g. "Artifact 001"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "campaign_name",
      title: "Campaign Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "brand_logo",
      title: "Brand Logo",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "content",
      title: "Content",
      type: "text",
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "stats",
      title: "Stats",
      type: "object",
      validation: (Rule) => Rule.required(),
      fields: [
        defineField({
          name: "primary",
          title: "Primary Stat",
          type: "object",
          validation: (Rule) => Rule.required(),
          fields: [
            defineField({
              name: "label",
              title: "Label",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "value",
              title: "Value",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "isProgress",
              title: "Is Progress",
              type: "boolean",
              description:
                "Whether this stat should render as a progress indicator",
              initialValue: false,
            }),
          ],
        }),
        defineField({
          name: "secondary",
          title: "Secondary Stats",
          type: "array",
          validation: (Rule) => Rule.required().min(1).max(6),
          of: [
            {
              type: "object",
              name: "statItem",
              fields: [
                defineField({
                  name: "label",
                  title: "Label",
                  type: "string",
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: "value",
                  title: "Value",
                  type: "string",
                  validation: (Rule) => Rule.required(),
                }),
              ],
              preview: {
                select: { title: "label", subtitle: "value" },
              },
            },
          ],
        }),
      ],
    }),
    defineField({
      name: "youtubeLink",
      title: "Youtube Link",
      type: "url",
      validation: (R) => R.uri({ scheme: ["https", "http", "mailto", "tel"] }),
    }),
    defineField({
      name: "order",
      title: "Order",
      type: "number",
      description: "Controls display order on the site",
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "campaign_name",
      media: "brand_logo",
    },
  },
});
