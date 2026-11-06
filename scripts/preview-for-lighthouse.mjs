import { spawn } from "node:child_process";

const isWindows = process.platform === "win32";
const command = isWindows ? "vp.exe" : "vp";
const args = ["preview", "--host", "127.0.0.1", "--port", "4173", "--strictPort"];
const server = spawn(command, args, { stdio: ["ignore", "pipe", "pipe"] });
let isReady = false;
let isCheckingReady = false;
let serverExited = false;

async function signalReady() {
  if (isReady || isCheckingReady) return;
  isCheckingReady = true;

  let lastError;
  for (let attempt = 0; attempt < 50; attempt += 1) {
    if (serverExited) break;

    try {
      const response = await fetch("http://127.0.0.1:4173/");
      if (response.ok) {
        isReady = true;
        process.stdout.write("LHCI_PREVIEW_READY\n");
        return;
      }
      lastError = new Error(`O preview respondeu com HTTP ${response.status}.`);
    } catch (error) {
      lastError = error;
    }

    await new Promise((resolve) => setTimeout(resolve, 200));
  }

  process.stderr.write(
    `O preview do Lighthouse não respondeu no prazo esperado: ${lastError?.message ?? "erro desconhecido"}\n`,
  );
  server.kill();
  process.exitCode = 1;
}

server.stdout.on("data", (chunk) => {
  const output = chunk.toString();
  process.stdout.write(output);
  if (output.includes("Local:")) void signalReady();
});

server.stderr.on("data", (chunk) => {
  const output = chunk.toString();
  process.stderr.write(output);
  if (output.includes("Local:")) void signalReady();
});

server.on("error", (error) => {
  process.stderr.write(`${error.message}\n`);
  process.exitCode = 1;
});

server.on("exit", (code) => {
  serverExited = true;
  if (code && code !== 0) process.exitCode = code;
});

for (const signal of ["SIGINT", "SIGTERM"]) {
  process.on(signal, () => server.kill(signal));
}

void signalReady();
