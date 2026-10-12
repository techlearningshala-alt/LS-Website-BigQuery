// utils/cleanHTML.js
import { markExternalEditorLinks } from "./markExternalEditorLinks";

export const cleanHTML = (html) => {
  if (html == null || html === "") return "";

  const htmlString = typeof html === "string" ? html : String(html);

  const cleaned = htmlString
    .replace(/\{ ?"? ?" ?\}/g, " ")          // your existing replacement
    .replace(/&nbsp;/g, " ")                  // replace &nbsp; with space
    .replace(/<p>\s*<\/p>/gi, "")             // remove empty <p> tags
    .trim();

  return markExternalEditorLinks(cleaned);
};
