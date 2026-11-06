import { defineEnvVars } from "@sveltejs/kit/env";

const defaultApiUrl = "https://pokeapi.co/api/v2";

export const variables = defineEnvVars({
  PUBLIC_API_URL: {
    public: true,
    description: "Base URL da API consumida pelo cliente e pelo servidor.",
    schema: (value) => {
      const baseUrl = value?.trim() || defaultApiUrl;
      let url: URL;

      try {
        url = new URL(baseUrl);
      } catch {
        throw new Error("PUBLIC_API_URL deve ser uma URL absoluta válida.");
      }

      if (url.protocol !== "http:" && url.protocol !== "https:") {
        throw new Error("PUBLIC_API_URL deve usar o protocolo HTTP ou HTTPS.");
      }

      return baseUrl.replace(/\/+$/, "");
    },
  },
});
