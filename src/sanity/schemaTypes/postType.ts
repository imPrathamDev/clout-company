import { DocumentTextIcon } from "@sanity/icons/DocumentText";
import { defineArrayMember, defineField, defineType } from "sanity";

export const postType = defineType({
  name: "log",
  title: "Log",
  type: "document",
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: "title",
      type: "string",
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: {
        source: "title",
      },
    }),
    defineField({
      name: "mainImage",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: "alt",
          type: "string",
          title: "Alternative text",
        }),
      ],
    }),
    defineField({
      name: "categories",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: { type: "category" } })],
    }),
    defineField({
      name: "publishedAt",
      type: "datetime",
    }),
    // ── Rich Content ──────────────────────────────────────────────────────────
    defineField({
      name: "content",
      title: "Full Case Study Content",
      type: "array",
      group: "content",
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

        // Pull quote / callout
        {
          type: "object",
          name: "callout",
          title: "Callout / Pull Quote",
          fields: [
            defineField({ name: "text", title: "Text", type: "text", rows: 2 }),
            defineField({
              name: "variant",
              title: "Variant",
              type: "string",
              options: {
                list: [
                  { title: "Info", value: "info" },
                  { title: "Highlight", value: "highlight" },
                  { title: "Warning", value: "warning" },
                  { title: "Success", value: "success" },
                  { title: "Quote", value: "quote" },
                ],
              },
              initialValue: "info",
            }),
          ],
          preview: {
            select: { title: "text" },
            prepare: ({ title }: { title?: string }) => ({
              title: `💬 ${title}`,
            }),
          },
        },

        // Image gallery / carousel
        {
          type: "object",
          name: "imageGallery",
          title: "Image Gallery",
          fields: [
            defineField({
              name: "title",
              title: "Gallery Title",
              type: "string",
            }),
            defineField({
              name: "images",
              title: "Images",
              type: "array",
              of: [
                {
                  type: "image",
                  options: { hotspot: true },
                  fields: [
                    defineField({
                      name: "alt",
                      title: "Alt Text",
                      type: "string",
                    }),
                    defineField({
                      name: "caption",
                      title: "Caption",
                      type: "string",
                    }),
                  ],
                },
              ],
            }),
          ],
          preview: {
            select: { title: "title" },
            prepare: ({ title }: { title?: string }) => ({
              title: `🖼️ Gallery: ${title}`,
            }),
          },
        },

        // Comparison table
        {
          type: "object",
          name: "comparisonTable",
          title: "Before / After Comparison",
          fields: [
            defineField({
              name: "title",
              title: "Table Title",
              type: "string",
            }),
            defineField({
              name: "rows",
              title: "Rows",
              type: "array",
              of: [
                {
                  type: "object",
                  fields: [
                    defineField({
                      name: "metric",
                      title: "Metric",
                      type: "string",
                    }),
                    defineField({
                      name: "before",
                      title: "Before",
                      type: "string",
                    }),
                    defineField({
                      name: "after",
                      title: "After",
                      type: "string",
                    }),
                    defineField({
                      name: "change",
                      title: "Change / Growth",
                      type: "string",
                    }),
                  ],
                  preview: {
                    select: { title: "metric", subtitle: "change" },
                  },
                },
              ],
            }),
          ],
          preview: {
            select: { title: "title" },
            prepare: ({ title }: { title?: string }) => ({
              title: `📋 Table: ${title}`,
            }),
          },
        },
      ],
    }),

    // ── SEO ───────────────────────────────────────────────────────────────────
    defineField({
      name: "seo",
      title: "SEO Settings",
      type: "object",
      group: "seo",
      fields: [
        defineField({
          name: "metaTitle",
          title: "Meta Title",
          type: "string",
          description: "Recommended: 50–60 characters.",
          validation: (R) => R.max(60),
        }),
        defineField({
          name: "metaDescription",
          title: "Meta Description",
          type: "text",
          rows: 3,
          description: "Recommended: 150–160 characters.",
          validation: (R) => R.max(160),
        }),
        defineField({
          name: "ogImage",
          title: "Open Graph Image",
          type: "image",
          description: "Recommended: 1200×630px",
          options: { hotspot: true },
        }),
        defineField({
          name: "canonicalUrl",
          title: "Canonical URL",
          type: "url",
        }),
        defineField({
          name: "keywords",
          title: "Focus Keywords",
          type: "array",
          of: [{ type: "string" }],
          options: { layout: "tags" },
        }),
        defineField({
          name: "noIndex",
          title: "No Index (hide from search engines)",
          type: "boolean",
          initialValue: false,
        }),
        defineField({
          name: "structuredData",
          title: "Extra Structured Data (JSON-LD)",
          type: "text",
          description: "Optional raw JSON-LD for rich snippets.",
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      author: "author.name",
      media: "mainImage",
    },
    prepare(selection) {
      const { author } = selection;
      return { ...selection, subtitle: author && `by ${author}` };
    },
  },
});
