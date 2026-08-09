import oxfmt from "@kekkon-nexus/config/oxfmt";
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
		ignorePatterns: ["aube-lock.yaml"],
	},
	lint: {
		extends: [oxlint],
		options: {
			typeAware: true,
			typeCheck: true,
		},
	},
	staged: {
		"*": "vp check --no-error-on-unmatched-pattern --fix",
	},
});
