const formFactor = process.env.LIGHTHOUSE_FORM_FACTOR === "desktop" ? "desktop" : "mobile";
const isMobile = formFactor === "mobile";

module.exports = {
  ci: {
    collect: {
      url: [
        "http://127.0.0.1:4173/",
        "http://127.0.0.1:4173/compare",
        "http://127.0.0.1:4173/pokemon/25",
      ],
      startServerCommand: "node scripts/preview-for-lighthouse.mjs",
      startServerReadyPattern: "LHCI_PREVIEW_READY",
      startServerReadyTimeout: 30000,
      numberOfRuns: 1,
      ...(process.env.CHROME_PATH ? { chromePath: process.env.CHROME_PATH } : {}),
      settings: {
        onlyCategories: ["seo"],
        formFactor,
        screenEmulation: {
          mobile: isMobile,
          width: isMobile ? 412 : 1350,
          height: isMobile ? 823 : 940,
          deviceScaleFactor: 1,
          disabled: !isMobile,
        },
      },
    },
    upload: {
      target: "filesystem",
      outputDir: `.lighthouseci/${formFactor}`,
    },
  },
};
