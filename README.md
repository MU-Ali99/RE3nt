# Ghar — Rent Manager

Ghar is a calm, mobile-first property and rent management application for independent landlords in India. It brings properties, units, tenants, rent, maintenance, documents, invitations and notices into one intentionally simple product.

## Design preview

The current design phase includes two database-free routes:

- `/` — public marketing website
- `/demo` — interactive owner-product prototype

The demo includes responsive designs for the owner overview, properties, tenants, rent collection, maintenance and activity. These routes use local mock data and can be reviewed without PostgreSQL.

## Visual direction

The interface uses a white Tokyo-inspired palette:

- White primary canvas
- Pale lavender secondary surfaces
- Deep purple navigation and typography
- Tokyo red status dots and attention markers
- Editorial serif display typography
- Compact sans-serif application typography

The public site and product demo are inspired by premium editorial real-estate layouts while retaining an original Ghar identity.

## Functional application

The repository also contains the database-backed MVP:

- Owner and tenant authentication
- Server-side authorization
- Property and unit management
- Separate tenant and tenancy records
- Rent generation and external payment recording
- Maintenance requests and status history
- Secure tenant invitations and tenant portal
- Property notices and protected rental documents
- Activity records

## Technology

- Next.js 15, React 19 and TypeScript
- Tailwind CSS
- PostgreSQL and Prisma
- Vitest

## Run the design locally

Node.js 20 or newer is required.

```bash
npm install
npm run dev -- -p 3001
```

Open `http://localhost:3001` for the public site or `http://localhost:3001/demo` for the interactive product demo. PostgreSQL is not required for these two routes.

## Run the full database-backed application

1. Install PostgreSQL 15 or newer.
2. Copy `.env.example` to `.env` and update its values.
3. Run the migration and seed commands.
4. Start the development server.

```bash
npm install
npm run db:migrate
npm run db:seed
npm run dev -- -p 3001
```

Demo accounts:

| Role | Email | Password |
| --- | --- | --- |
| Owner | `raj@example.com` | `RentManager123!` |
| Tenant | `rahul@example.com` | `Tenant123!` |

## Validation

```bash
npm run typecheck
npm test
npm run build
```

The business-rule tests cover authorization, rent status, partial payments, invitation validity and maintenance access.

## Storage and deployment

Local document storage lives under `storage/uploads`. Documents are served through an authorized route rather than unrestricted public URLs.

Production infrastructure is intentionally deferred. The planned deployment architecture is CI/CD-driven with a hosted PostgreSQL database and compute provisioned in Oracle Cloud or Azure.

Do not commit `.env` files or production credentials.
