import oxfmt from "@kekkon-nexus/config/oxfmt";
import oxlint from "@kekkon-nexus/config/oxlint";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite-plus";

export default defineConfig({
	plugins: [react(), tailwindcss()],

	fmt: {
		...oxfmt,
	},
	lint: {
		extends: [oxlint],
		options: {
			typeAware: false,
		},
	},
	staged: {
		"*": "vp check --no-error-on-unmatched-pattern",
	},
});
