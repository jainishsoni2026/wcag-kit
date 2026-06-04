import { getPatternById } from "../data/patterns.js";

// Returns full details for a specific pattern
// Input: pattern id e.g. "dropdown"
// Output: full pattern object or error message
export function getPattern(id: string) {
  const pattern = getPatternById(id);

  if (!pattern) {
    return {
      error: true,
      message: `Pattern "${id}" not found. Use list_patterns to see available patterns.`,
      availableIds: [
        "dropdown", "modal", "form", "headings", "button", "image", "contrast",
        "navigation", "accordion", "tabs", "toast", "table", "focus",
        "combobox", "tooltip", "datepicker", "carousel", "progress",
        "pagination", "dragdrop", "radiocheckbox", "search",
        "infinitescroll", "fileupload", "skeleton", "alertdialog", "breadcrumb"
      ]
    };
  }

  return {
    error: false,
    pattern
  };
}
