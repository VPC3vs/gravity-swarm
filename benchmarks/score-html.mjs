import { readFileSync } from "node:fs";

const files = process.argv.slice(2);

if (!files.length) {
  console.error("Usage: node benchmarks/score-html.mjs <file.html> [...]");
  process.exit(1);
}

const rows = files.map((file) => {
  const html = readFileSync(file, "utf8");
  const nonEmptyLoc = html.split(/\r?\n/).filter((line) => line.trim()).length;
  const externalDependencies = [
    ...html.matchAll(/<(?:script|link)\b[^>]*(?:src|href)=["']https?:\/\//gi),
  ].length;

  return {
    file,
    non_empty_loc: nonEmptyLoc,
    uses_native_date_input: /type=["']date["']/i.test(html),
    uses_native_color_input: /type=["']color["']/i.test(html),
    external_dependencies_count: externalDependencies,
    has_label: /<label\b/i.test(html),
    has_preview: /preview/i.test(html),
    has_save_button: />\s*Save\s*</i.test(html),
    has_reset_button: />\s*Reset\s*</i.test(html),
    has_required_city_suggestions: ["Rome", "Milan", "Naples", "Turin", "Palermo"].every((city) =>
      html.includes(city),
    ),
  };
});

console.log(JSON.stringify(rows, null, 2));
