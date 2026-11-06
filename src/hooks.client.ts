import type { ClientInit } from "@sveltejs/kit/hooks";

export const init: ClientInit = async () => {
  if (!import.meta.env.DEV) return;

  const { worker } = await import("#lib/core/msw/browser.js");
  await worker.start({ onUnhandledFrame: "bypass" });
};
