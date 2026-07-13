import { renderCsv } from "./csv.mjs";
import { renderJson } from "./json.mjs";

export function render(records, format = "text") {
  if (format === "csv") {
    return renderCsv(records);
  }
  if (format === "json") {
    return renderJson(records);
  }
  if (format === "text") {
    return records.map(({ name, count }) => `${name}: ${count}`).join("\n");
  }
  throw new Error(`Unsupported format: ${format}`);
}
