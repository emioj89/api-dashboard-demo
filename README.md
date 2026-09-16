# Product API Dashboard

[![CI](https://github.com/emioj89/api-dashboard-demo/actions/workflows/ci.yml/badge.svg)](https://github.com/emioj89/api-dashboard-demo/actions/workflows/ci.yml)
[![Deploy to GitHub Pages](https://github.com/emioj89/api-dashboard-demo/actions/workflows/deploy.yml/badge.svg)](https://github.com/emioj89/api-dashboard-demo/actions/workflows/deploy.yml)

A responsive React and TypeScript dashboard that consumes a public REST API and provides real-time search, filtering, sorting, and product analytics.

## Live Demo

[https://emioj89.github.io/api-dashboard-demo/](https://emioj89.github.io/api-dashboard-demo/)

*(Note: Live demo link will be accessible once the initial deployment workflow completes on main branch).*

## Features

- **REST API Integration**: Asynchronous data retrieval with native `fetch` and `AbortController`.
- **Dynamic Dataset**: Loads the complete product dataset returned by DummyJSON using `?limit=0` (currently 194 products; adapts automatically if the upstream API dataset expands).
- **Text Search**: Real-time filtering matching product titles, brands, and categories.
- **Dynamic Category Filtering**: Dynamically extracted category list for instant drop-down filtering.
- **Multiple Sorting Modes**: Sort products by Price (Ascending / Descending), Customer Rating (High to Low), and Title (A-Z).
- **Real-Time KPIs**: Dynamic metric cards computing total visible products, average price, average rating, and low stock items (≤ 10 items).
- **Loading State**: Clean skeleton/spinner feedback during data acquisition.
- **Error State & Retry**: Graceful error handling UI with single-click retry mechanism.
- **Empty State**: Clear feedback and quick filter reset button when queries yield zero matches.
- **Responsive Product Grid**: Fluid layout adapting from mobile screens to large desktop monitors.
- **Image Fallbacks**: Robust image fallback rendering DOM elements on error to eliminate infinite retry loops.
- **Accessible Controls**: Form controls with proper ARIA attributes, keyboard navigation support, and visible focus rings.

## API

- **Endpoint**: `https://dummyjson.com/products?limit=0`
- **Authentication**: None required (Public REST API).

## Tech Stack

- **React 19**
- **TypeScript**
- **Vite**
- **CSS3** (Custom Properties & Flexbox/Grid)
- **Fetch API**
- **Vitest**
- **GitHub Actions**

## Architecture

The project follows a modular, layer-separated structure for maintainability and scalability:

```text
src/
├── api/          # Data fetching utilities and API service layers
├── components/   # Modular, presentation & stateful React components
├── hooks/        # Custom React hooks (e.g., useProducts for lifecycle state)
├── types/        # TypeScript interfaces and domain type definitions
└── utils/        # Pure utility functions (filtering, sorting, KPI calculation)
```

## Installation

```bash
git clone https://github.com/emioj89/api-dashboard-demo.git
cd api-dashboard-demo
npm install
npm run dev
```

## Available Scripts

- `npm run dev`: Launch local Vite development server with HMR.
- `npm run build`: Type-check using `tsc` and produce production build in `dist/`.
- `npm run lint`: Run Oxlint linter for static code analysis.
- `npm run test`: Execute unit test suite using Vitest.
- `npm run preview`: Serve the compiled `dist/` build locally for previewing.

## Testing

Unit tests are implemented using **Vitest** to verify pure business logic and network handlers without DOM overhead.

- Total Test Files: **3**
- Total Tests: **21 passed**
- Coverage includes:
  - **Product Filtering**: Text search by title, brand, category; case-insensitivity; category dropdown matching; combined queries; empty search handling.
  - **Product Sorting**: Price ascending/descending, rating high-to-low, title A-Z, and immutability checks on source datasets.
  - **Category Extraction**: Unique category deduction and alphabetical sorting.
  - **Product KPIs**: Total items, average price rounding, average rating computation, low stock threshold logic (≤ 10 items), empty dataset safeguards.
  - **API Fetching**: Status code validation, JSON parsing, error throwing on non-200 responses, and `AbortSignal` propagation.

## Error Handling

- **AbortController**: Cancels pending HTTP requests when components unmount or re-render to prevent race conditions and memory leaks.
- **Friendly Error UI**: Catches network failures and presents a clean error card with an actionable "Retry" button.
- **Broken Image Fallback**: Catches `<img>` loading failures via `onError` and conditionally renders a pure CSS/DOM placeholder, preventing infinite image loading loops.

## Responsive Design

Designed with a mobile-first approach utilizing CSS Flexbox and Grid layout systems:
- **Mobile**: Single-column product grid with full-width search and control bars.
- **Tablet**: 2 to 3 column grid adaptation with side-by-side KPI cards.
- **Desktop**: 4-column responsive grid layout with sticky control headers.

## Accessibility

- **Semantic HTML**: Structural tags (`<header>`, `<main>`, `<section>`, `<footer>`, `<article>`, `<nav>`).
- **Keyboard Controls**: All interactive buttons, select dropdowns, and search inputs are fully accessible via `Tab` and `Enter/Space`.
- **Labels**: Explicit `<label>` elements associated with form inputs and `aria-label` landmarks on sections.
- **Alt Text**: Descriptive alt text on product thumbnails and fallback icons for screen readers.
- **Focus Management**: Customized `:focus-visible` outline styles for enhanced visual tracking.

## Continuous Integration

Automated testing and verification powered by **GitHub Actions** (`.github/workflows/ci.yml`).
Every push and pull request targeting the `main` branch triggers:
1. Fresh Node.js 20 environment setup with NPM caching.
2. Dependency installation (`npm ci`).
3. Code linting (`npm run lint`).
4. Unit testing (`npm run test`).
5. Production build validation (`npm run build`).

## Deployment

Automated deployment to **GitHub Pages** powered by **GitHub Actions** (`.github/workflows/deploy.yml`).
Pushes to `main` compile the Vite project with base path `/api-dashboard-demo/` and publish the artifact directly to GitHub Pages using official GitHub Pages actions (`configure-pages`, `upload-pages-artifact`, `deploy-pages`).

## Author

**Emiliano Ostellino**

GitHub: [https://github.com/emioj89](https://github.com/emioj89)
