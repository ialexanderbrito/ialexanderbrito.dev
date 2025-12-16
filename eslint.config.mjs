const nextPreset = (await import("@ialexanderbrito/eslint-config")).default;
const tsPluginModule = await import("@typescript-eslint/eslint-plugin");
const tsPlugin = tsPluginModule.default || tsPluginModule;

export default [
  // include all configs from the preset (it's an array of flat-config entries)
  ...nextPreset,
  // add TypeScript-specific overrides
  {
    files: ["**/*.{ts,tsx}"],
    plugins: {
      "@typescript-eslint": tsPlugin,
    },
    languageOptions: {
      parser: (await import("@typescript-eslint/parser")).default,
    },
    rules: {
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "no-use-before-define": "off",
      "@typescript-eslint/no-use-before-define": "warn",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-var-requires": "off",
    },
  },
  // custom project-level tweaks
  {
    rules: {
      "@next/next/no-img-element": "off",
    },
  },
];
