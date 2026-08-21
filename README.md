# BeliMudah

[![CI](https://github.com/ryansuhartanto/koda-b8-react/actions/workflows/ci.yaml/badge.svg)](https://github.com/ryansuhartanto/koda-b8-react/actions/workflows/ci.yaml)
[![Ghcr](https://ghcr-badge.egpl.dev/ryansuhartanto/koda-b8-react/latest_tag?label=ghcr&ignore=latest,sha-*)](https://ghcr.io/ryansuhartanto/koda-b8-react)
[![Netlify](https://api.netlify.com/api/v1/badges/005e81c9-a22a-4168-b34b-5a18786e5f6d/deploy-status)](https://app.netlify.com/projects/ryan-belimudah/deploys)

An e-commerce frontend, storefront through admin dashboard, built from a shared Figma brief as the final project for Koda Academy (Fullstack track, Batch 8).

End-to-end static typing, design tokens in the stylesheet, one build toolchain.

> [!NOTE]
> The UI copy is in Indonesian, the target market for the brief. The codebase and documentation are in English.

## Screenshot

![Homepage](docs/homepage.png)
![Registration](docs/registration.png)
![Payment](docs/payment.png)

## Tech stack

- **React 19** for the UI
- **React Router 8** (`createBrowserRouter`, lazy routes)
- **Tailwind CSS v4** (CSS-first `@theme` config)
- **Vite**, via **vite-plus** (a Vite superset with lint and format built in)
- **unplugin-icons** (Lucide, Simple Icons)
- **TypeScript 7** under the shared strict config
- **oxlint, oxfmt** for lint and format (bundled in vite-plus)
- **TanStack Table 8** for the admin data tables
- **Recharts 3** for the admin dashboard charts

## Features

### Storefront

- Landing page: hero carousel, category grid, flash deals, newest and featured products
- Product browse with price, category, rating, and availability filters
- Product detail with variant selection and related products
- Cart with quantity stepper and promo-code field
- Multi-step checkout (shipping, payment, confirmation, success) with a stateful stepper
- Account area: profile, order history, wishlist, addresses, payment methods
- Auth flows: login, register, forgot password

### Admin

> [!WARNING]
> Not finished; static preview only.

- Dashboard: KPI cards, revenue area chart, category donut, recent orders, top products
- Product management: searchable / filterable table, summary stats, add-product modal
- Order management: status tabs, filtering, per-row actions
- Customer management: growth chart, tiered customer table
- Settings

## Usage

Requires [bun](https://bun.com).

```sh
bun install

# start the dev server
bun run dev

# production build
bun run build
```

Other tasks:

- `bun run fmt`
- `bun run lint`
- `bun run test`

## Structure

```tree
src/
├── +Layout.tsx              # root layout
├── main.tsx                 # router definition + entry
├── style.css                # design tokens (@theme) + component layer
├── data.json                # mock data (products, categories, admin)
├── components/              # shared UI (cards, badges, form fields, ...)
│   └── admin/               # admin-only primitives (DataTable, StatCard)
├── hooks/                   # useCheckout, ...
├── lib/                     # utils (cn, rupiah, slugify), status maps
└── pages/
    ├── (store)/             # storefront + nested (account) area
    ├── (auth)/              # login, register, forgot-password
    └── admin/               # dashboard, products, orders, customers, settings
```

Route groups in parentheses (`(store)`, `(auth)`, `(account)`) organise the tree without adding URL segments. The `#/` prefix is a path alias to `src/`, declared in `package.json` (`imports`) and mirrored in `tsconfig.json`.

## Scope

The storefront and account areas run against the API at `VITE_BACKEND_URL`. The hero banners and the admin dashboard and customer pages are still static (`src/data.json`).

## License

This project is licensed under [MIT](LICENSE).  
Copyright © Ryan Suhartanto <suhartanto@kekkon.nexus>.
