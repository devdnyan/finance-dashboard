# Finance Dashboard

This is a responsive finance dashboard built with React, TypeScript, and Vite. It helps track transactions, view financial summaries, and switch between viewer/admin access.

## Assignment Objective

For this assignment, I focused on building a practical dashboard with:

- summary cards for key financial metrics
- chart-based insights for trend and category breakdown
- transaction table with search and CRUD actions
- role-based UI behavior (viewer/admin)
- light and dark theme support

## Tech Stack

- React 19
- TypeScript 5
- Vite 8
- Tailwind CSS 4
- Recharts
- PrimeReact DataTable
- ESLint 9

## Features Implemented

### 1. Dashboard Summary

- Total Balance
- Total Income
- Total Expenses
- Top Expense Category

These values are calculated from shared transaction state managed with React Context.

### 2. Visual Analytics

- Line chart for cash flow trend over months
- Pie chart for expense category distribution
- Custom tooltip component for chart values

### 3. Transactions Module

- searchable transaction table
- sorted by latest date by default
- add transaction (admin only)
- edit transaction (admin only)
- delete transaction (admin only)
- form validation for date, category, and positive amount

### 4. Role-Based Access

- Viewer: can view data
- Admin: can add/edit/delete transactions

Role can be switched from the navbar to demonstrate permission-based UI behavior.

### 5. Theme Support

- Light mode and dark mode toggle
- Theme persisted using localStorage
- Root color-scheme and dark class updated automatically

## Project Structure

```text
src/
  components/
    dashboard/
      Summary.tsx
      summary/
        Card.tsx
        LineChart.tsx
        PiChart.tsx
        ToolTipLabel.tsx
    nav/
      NavigationBar.tsx
    Transactions/
      TransactionTable.tsx
  context/
    FinanceContext.tsx
    FinanceContextValue.ts
    RoleContext.tsx
    RoleContextValue.ts
    ThemesContext.tsx
    ThemesContextValue.ts
    hooks.tsx
  assets/
    tmonths.ts
  utils/
    helperfunctions.ts
    tablehelper.ts
```

## Setup and Run

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
npm install
```

### Start Development Server

```bash
npm run dev
```

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Lint

```bash
npm run lint
```

## Current Data Behavior

- Finance summaries and pie chart are driven by the current transaction state.
- The line chart currently uses the seeded dataset from `src/assets/tmonths.ts`.

## Submission Checklist

- Code compiles successfully with `npm run build`
- Linting passes with `npm run lint`
- UI is responsive across desktop and mobile layouts
- Role toggle and theme toggle are functional

## Future Improvements

- Connect transactions to a backend or local persistence layer
- Drive all charts from live transaction state
- Add pagination and advanced filters to the transaction table
- Add unit and component tests

## Assignment Assumptions

- The application uses seeded dummy data from `src/assets/tmonths.ts` as the primary dataset.
- Dashboard values and chart output depend on this sample dataset unless transactions are edited during runtime.
- No backend/API integration is assumed for this assignment submission.
- Data changes made in the UI are in-memory only and reset on page refresh.
