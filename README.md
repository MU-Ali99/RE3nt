# Rent Manager

Mobile-first rent management for independent landlords in India.

## Local setup

1. Install Node.js 20+ and PostgreSQL 15+.
2. Copy `.env.example` to `.env` and update the values.
3. Run `npm install`, `npm run db:migrate`, `npm run db:seed`, then `npm run dev`.
4. Demo owner: `raj@example.com` / `RentManager123!`.

The local storage adapter writes private files beneath `storage/uploads`; downloads must go through an authorized server route. Replace the adapter with object storage in production.
