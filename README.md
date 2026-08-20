# Ghar — Design Prototype

Ghar is a lightweight, database-free interface prototype for a future property and rent management product for independent landlords in India.

This branch intentionally contains only the design layer. The earlier PostgreSQL, Prisma, authentication and server-side MVP is preserved in the [`fullstack-mvp`](https://github.com/MU-Ali99/Ghar-Rent-manager/tree/fullstack-mvp) branch.

## Included

- Editorial public website
- Interactive owner dashboard prototype
- Properties, tenants, rent, maintenance and activity views
- Responsive desktop and mobile layouts
- White Tokyo palette with lavender, deep purple and red accents
- Realistic local mock data
- No database, accounts, cloud services or environment variables

## Local development

Node.js 20 or newer is required.

```bash
npm install
npm run dev -- -p 3001
```

Open:

- `http://localhost:3001` — public website
- `http://localhost:3001/demo` — interactive application design

## Validation

```bash
npm run typecheck
npm run build
```

## Future layers

Production capabilities will be added incrementally after the design is stable:

1. API and service layer
2. Authentication and authorization
3. PostgreSQL and migrations
4. Property, tenancy and rent workflows
5. Documents, invitations and notifications
6. CI/CD, hosted infrastructure, monitoring and backups
