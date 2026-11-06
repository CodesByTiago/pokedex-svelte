import { spawnSync } from "node:child_process";
import { readdir, readFile, unlink } from "node:fs/promises";
import path from "node:path";

const isWindows = process.platform === "win32";
const vpCommand = isWindows ? (process.env.ComSpec ?? "cmd.exe") : "vp";
const threshold = 90;
const formFactors = ["mobile", "desktop"];

function run(args, env = process.env) {
  const commandArgs = isWindows ? ["/d", "/c", `vp ${args.join(" ")}`] : args;
  const result = spawnSync(vpCommand, commandArgs, {
    env,
    stdio: "inherit",
  });

  if (result.error) throw result.error;
  if (result.status !== 0) {
    throw new Error(`vp ${args.join(" ")} terminou com código ${result.status ?? "desconhecido"}.`);
  }
}

async function printScores(formFactor) {
  const manifestPath = path.resolve(`.lighthouseci/${formFactor}/manifest.json`);
  const manifest = JSON.parse(await readFile(manifestPath, "utf8"));
  const results = await Promise.all(
    manifest.map(async ({ url, jsonPath }) => {
      const report = JSON.parse(await readFile(path.resolve(jsonPath), "utf8"));
      return {
        route: new URL(url).pathname || "/",
        score: Math.round((report.categories.seo.score ?? 0) * 100),
      };
    }),
  );

  console.log(`\nSEO Lighthouse — ${formFactor}`);
  console.table(results.map(({ route, score }) => ({ rota: route, nota: `${score}/100` })));

  const failed = results.filter(({ score }) => score < threshold);
  if (failed.length > 0) {
    throw new Error(
      `Meta SEO não atingida (${threshold}/100): ${failed.map(({ route, score }) => `${route}=${score}`).join(", ")}`,
    );
  }

  console.log(`Relatórios salvos em ${path.resolve(`.lighthouseci/${formFactor}`)}.`);
}

async function removeTemporaryReports() {
  const reportDirectory = path.resolve(".lighthouseci");
  const entries = await readdir(reportDirectory, { withFileTypes: true }).catch((error) => {
    if (error.code === "ENOENT") return [];
    throw error;
  });

  await Promise.all(
    entries
      .filter((entry) => entry.isFile() && /^lhr-[\w-]+\.(json|html)$/.test(entry.name))
      .map((entry) => unlink(path.join(reportDirectory, entry.name))),
  );
}

try {
  run(["build"]);

  for (const formFactor of formFactors) {
    run(["exec", "lhci", "collect", "--config=.lighthouserc.cjs"], {
      ...process.env,
      LIGHTHOUSE_FORM_FACTOR: formFactor,
    });
    run(["exec", "lhci", "upload", "--config=.lighthouserc.cjs"], {
      ...process.env,
      LIGHTHOUSE_FORM_FACTOR: formFactor,
    });
    await printScores(formFactor);
    await removeTemporaryReports();
  }
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
}
