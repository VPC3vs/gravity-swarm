export const greeting = "Hello";

if (import.meta.url === `file:///${process.argv[1].replaceAll("\\", "/")}`) {
  console.log(greeting);
}
