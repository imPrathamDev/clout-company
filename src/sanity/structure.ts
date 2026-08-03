import type { StructureResolver } from "sanity/structure";

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Clout Content")
    .items([
      S.documentTypeListItem("log").title("Logs"),
      S.documentTypeListItem("category").title("Categories"),
      S.documentTypeListItem("clientLogo").title("Client Logos"),
      S.documentTypeListItem("artifactCampaign").title("Artifacts"),
      S.documentTypeListItem("creator").title("Creators"),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) =>
          item.getId() &&
          ![
            "log",
            "category",
            "clientLogo",
            "artifactCampaign",
            "creator",
          ].includes(item.getId()!),
      ),
    ]);
