import { defineFlatConfig } from "eslint-define-config";
import { fileURLToPath } from "url";
import path from "path";
import typescriptParser from "@typescript-eslint/parser";
import typescriptPlugin from "@typescript-eslint/eslint-plugin";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineFlatConfig([
  {
    files: ["**/*.{js,ts}"],
    ignores: [
      "dist/**/*",
      "bin/schwab-authorize.js",
      "eslint.config.js",
      "examples/**/*",
    ],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        tsconfigRootDir: __dirname,
        project: "./tsconfig.json",
      },
    },
    plugins: {
      "@typescript-eslint": typescriptPlugin,
    },
    rules: {
      ...typescriptPlugin.configs.recommended.rules,
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-expressions": "off",
    },
  },
]);
