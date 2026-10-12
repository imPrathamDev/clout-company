import { defineField, defineType } from "sanity";

export default defineType({
  name: "caseStudy",
  title: "Case Study",
  type: "document",
  fields: [
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      description: 'e.g. "Case Study 001"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
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
      description: "Short overview text used in the summary card.",
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
    // ── Rich Content ──────────────────────────────────────────────────────────
    defineField({
      name: "body",
      title: "Case Study Body",
      description:
        "Full rich-text write-up. Supports inline images and natively-hosted video (uploaded directly to Sanity — no YouTube/Vimeo links).",
      type: "array",
      of: [
        // Standard text blocks
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "Heading 2", value: "h2" },
            { title: "Heading 3", value: "h3" },
            { title: "Heading 4", value: "h4" },
            { title: "Quote", value: "blockquote" },
            { title: "Small", value: "small" },
          ],
          lists: [
            { title: "Bullet", value: "bullet" },
            { title: "Numbered", value: "number" },
          ],
          marks: {
            decorators: [
              { title: "Bold", value: "strong" },
              { title: "Italic", value: "em" },
              { title: "Underline", value: "underline" },
              { title: "Strike", value: "strike-through" },
              { title: "Code", value: "code" },
            ],
            annotations: [
              {
                name: "link",
                type: "object",
                title: "Link",
                fields: [
                  defineField({
                    name: "href",
                    title: "URL",
                    type: "url",
                    validation: (R) =>
                      R.uri({ scheme: ["https", "http", "mailto", "tel"] }),
                  }),
                  defineField({
                    name: "blank",
                    title: "Open in new tab",
                    type: "boolean",
                    initialValue: true,
                  }),
                ],
              },
            ],
          },
        },

        // Inline image
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({ name: "alt", title: "Alt Text", type: "string" }),
            defineField({ name: "caption", title: "Caption", type: "string" }),
          ],
        },

        // Natively-hosted video (uploaded file, not an external embed)
        {
          type: "file",
          name: "video",
          title: "Video",
          options: { accept: "video/*" },
          fields: [
            defineField({ name: "caption", title: "Caption", type: "string" }),
          ],
          preview: {
            select: { title: "caption", subtitle: "asset.originalFilename" },
            prepare: ({
              title,
              subtitle,
            }: {
              title?: string;
              subtitle?: string;
            }) => ({
              title: `🎬 ${title || subtitle || "Video"}`,
            }),
          },
        },

        // Embedded video from YouTube or Instagram (lazy-loaded on the frontend)
        {
          type: "object",
          name: "videoEmbed",
          title: "Embedded Video (YouTube / Instagram)",
          fields: [
            defineField({
              name: "url",
              title: "Video URL",
              type: "url",
              description:
                "Paste a YouTube (youtube.com / youtu.be) or Instagram (instagram.com/p, /reel(s), /tv) link.",
              validation: (Rule) =>
                Rule.required()
                  .uri({ scheme: ["https", "http"] })
                  .custom((value) => {
                    if (!value) return true;
                    const isSupported =
                      /(?:youtube\.com|youtu\.be)/.test(value) ||
                      /instagram\.com\/(?:[^/]+\/)?(p|reels?|tv)\//.test(
                        value,
                      );
                    return isSupported
                      ? true
                      : "Only YouTube or Instagram post/reel links are supported.";
                  }),
            }),
            defineField({ name: "caption", title: "Caption", type: "string" }),
          ],
          preview: {
            select: { title: "url", subtitle: "caption" },
            prepare: ({
              title,
              subtitle,
            }: {
              title?: string;
              subtitle?: string;
            }) => ({
              title: `📺 ${subtitle || title || "Embedded Video"}`,
            }),
          },
        },

        // Inline stats row (same shape as the top-level Stats field)
        {
          type: "object",
          name: "statsBlock",
          title: "Stats Row",
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
              ],
            }),
            defineField({
              name: "secondary",
              title: "Secondary Stats",
              type: "array",
              validation: (Rule) => Rule.min(0).max(6),
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
          preview: {
            select: {
              primaryLabel: "primary.label",
              primaryValue: "primary.value",
            },
            prepare: ({
              primaryLabel,
              primaryValue,
            }: {
              primaryLabel?: string;
              primaryValue?: string;
            }) => ({
              title: `📊 Stats: ${primaryValue ?? ""} ${primaryLabel ?? ""}`,
            }),
          },
        },
      ],
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
