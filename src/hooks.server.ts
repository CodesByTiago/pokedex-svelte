import type { Handle } from "@sveltejs/kit/hooks";

let serverStarted: Promise<void> | undefined;

export const handle: Handle = async ({ event, resolve }) => {
  if (import.meta.env.DEV) {
    serverStarted ??= import("#lib/core/msw/server.js").then(({ server }) => {
      server.listen({ onUnhandledFrame: "bypass" });
    });

    await serverStarted;
  }

  return resolve(event);
};
