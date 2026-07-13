const fs = require("fs");

async function main() {
  const response = await fetch("https://zenquotes.io/api/today");
  const [quote] = await response.json();

  const quoteText = `> ${quote.q}\n>\n> — ${quote.a}`;

  const readme = fs.readFileSync("README.md", "utf8");

  const updated = readme.replace(
    /<!--START_SECTION:quote-->[\s\S]*<!--END_SECTION:quote-->/,
    `<!--START_SECTION:quote-->
${quoteText}
<!--END_SECTION:quote-->`
  );

  fs.writeFileSync("README.md", updated);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});