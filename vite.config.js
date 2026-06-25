import oxfmt from "@kekkon-nexus/config/oxfmt";
import oxlint from "@kekkon-nexus/config/oxlint";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import icons from "unplugin-icons/vite";
import { defineConfig } from "vite-plus";

/** @type {ReturnType<typeof defineConfig>} */
// @ts-ignore
const config = defineConfig({
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
	},
	lint: {
		extends: [
			// @ts-ignore
			oxlint,
		],
		options: {
			typeAware: false,
		},
	},
	staged: {
		"*": "vp check --no-error-on-unmatched-pattern",
	},
});

export default config;
