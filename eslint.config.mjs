import typescriptEslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";

export default [{
    files: ["src/**/*.ts"],

    plugins: {
        "@typescript-eslint": typescriptEslint,
    },

    languageOptions: {
        ecmaVersion: 6,
        parser: tsParser,
        sourceType: "module",
    },

    rules: {
        "@typescript-eslint/semi": "off",
        "no-throw-literal": "warn",
        "no-unexpected-multiline": "off",
        curly: "warn",
        eqeqeq: "warn",
        semi: "off",
    },
}];