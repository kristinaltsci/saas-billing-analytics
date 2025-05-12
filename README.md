# SaaS Billing Analytics Dashboard

A modern, responsive SaaS dashboard for tracking billing analytics, customer metrics, and usage statistics. Built with Next.js, React, Tailwind CSS, and Radix UI, this project provides a comprehensive overview of your SaaS business performance.

## Features

- **Dashboard Overview**: Visualize key SaaS metrics including Monthly Recurring Revenue (MRR), customer growth, churn rate, and Average Revenue Per User (ARPU).
- **Interactive Analytics**: Line and bar charts for revenue, customer acquisition/churn, and usage metrics (API calls, storage, bandwidth) powered by Recharts.
- **Top Customers**: Highlight customers with the highest MRR and growth.
- **Modular Structure**: Organized sections for Customers, Invoices, Plans, Settings, Usage, and Webhooks.
- **Modern UI/UX**: Built with reusable components (cards, tables, charts, forms, etc.) using Radix UI and Tailwind CSS.
- **Custom Hooks**: Includes hooks for toast notifications and mobile detection.
- **Export & Analytics Actions**: Export reports and view detailed analytics directly from the dashboard.
- **Dark/Light Theme Support**: Easily switch between light and dark modes.

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **UI**: [React](https://react.dev/), [Radix UI](https://www.radix-ui.com/), [Tailwind CSS](https://tailwindcss.com/)
- **Charts**: [Recharts](https://recharts.org/)
- **Forms & Validation**: [React Hook Form](https://react-hook-form.com/), [Zod](https://zod.dev/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **TypeScript**: Type safety throughout the codebase

## Getting Started

1. **Install dependencies** (using [pnpm](https://pnpm.io/)):
   ```bash
   pnpm install
   ```
2. **Run the development server:**
   ```bash
   pnpm dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to view the dashboard.

3. **Build for production:**
   ```bash
   pnpm build
   pnpm start
   ```

## Project Structure

- `app/dashboard/` — Main dashboard pages (customers, invoices, plans, settings, usage, webhooks)
- `components/` — Reusable UI and chart components
- `hooks/` — Custom React hooks
- `lib/` — Utility functions and libraries
- `public/` — Static assets
- `styles/` — Tailwind and global styles

## Customization

- **Theming:** Easily switch between light and dark modes via Tailwind and Radix UI.
- **UI Components:** Extend or customize UI via the `components/ui/` and `components/charts/` directories.

## License

This project is for educational and demonstration purposes. 
