import oxfmt, { sortImports } from "@kekkon-nexus/config/oxfmt";
import oxlint from "@kekkon-nexus/config/oxlint";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import icons from "unplugin-icons/vite";
import { defineConfig } from "vite-plus";

export default defineConfig({
	plugins: [
		react(),
		tailwindcss(),
		icons({
			compiler: "jsx",
			jsx: "react",
			scale: 1,
			defaultClass: "inline-block",
		}),
	],

	fmt: {
		...oxfmt,
		ignorePatterns: ["bun.lock"],

		sortImports: sortImports({
			customGroups: [
				{
					groupName: "react",
					elementNamePattern: ["react", "react-**"],
				},
				{
					groupName: "icons",
					elementNamePattern: ["~icons/**"],
				},
			],
			groupsBeforeExternal: [["react"]],
			groupsBeforeInternal: [["icons"]],
		}),
	},
	lint: {
		extends: [oxlint],
		options: {
			typeAware: true,
			typeCheck: true,
		},

		rules: {
			"no-restricted-imports": [
				"error",
				{
					paths: [
						{
							name: "react",
							importNames: ["default"],
							message:
								"Do not use the default React import. Use named imports or namespace imports instead.",
						},
					],
				},
			],
		},
	},
	staged: {
		"*": "vp check --no-error-on-unmatched-pattern --fix",
	},
});
