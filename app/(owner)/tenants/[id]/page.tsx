import { notFound } from "next/navigation";
import { requireOwner } from "@/lib/auth";
import { db } from "@/lib/db";
import { formatDate, formatINR } from "@/lib/format";
import { rentState } from "@/lib/rent";
import { PageHeader } from "@/components/page-header";

export default async function TenantPage({ params }: { params: Promise<{ id: string }> }) {
  const { owner } = await requireOwner();
  const { id } = await params;
  const tenant = await db.tenantProfile.findFirst({
    where: { id, ownerId: owner.id, archivedAt: null },
    include: {
      tenancies: {
        include: {
          unit: { include: { property: true } },
          rentCharges: { include: { payments: true }, orderBy: { billingMonth: "desc" } },
        },
        orderBy: { leaseStart: "desc" },
      },
    },
  });
  if (!tenant) notFound();
  const current = tenant.tenancies.find((item) => item.status === "ACTIVE");

  return <div className="mx-auto max-w-5xl p-5 md:p-9">
    <PageHeader eyebrow="Tenant profile" title={tenant.fullName} description={tenant.phone} />
    {current && <section className="card mt-7 grid gap-5 p-5 sm:grid-cols-2 lg:grid-cols-4">
      <div><p className="muted text-xs">Home</p><strong>{current.unit.property.name}<br />{current.unit.name}</strong></div>
      <div><p className="muted text-xs">Monthly rent</p><strong>{formatINR(Number(current.monthlyRent))}</strong></div>
      <div><p className="muted text-xs">Due date</p><strong>Day {current.dueDay}</strong></div>
      <div><p className="muted text-xs">Lease started</p><strong>{formatDate(current.leaseStart)}</strong></div>
    </section>}
    <section className="mt-8">
      <h2 className="text-lg font-extrabold">Rent history</h2>
      <div className="card mt-3 overflow-hidden">
        {current?.rentCharges.map((charge) => {
          const state = rentState({ amount: Number(charge.amount), dueDate: charge.dueDate, payments: charge.payments.map((payment) => ({ amount: Number(payment.amount) })) });
          return <div className="flex items-center justify-between border-b border-[var(--border)] p-4 last:border-0" key={charge.id}>
            <div><strong>{new Intl.DateTimeFormat("en-IN", { month: "long", year: "numeric" }).format(charge.billingMonth)}</strong><p className="muted text-sm">Due {formatDate(charge.dueDate)}</p></div>
            <div className="text-right"><strong>{formatINR(Number(charge.amount))}</strong><p><span className={`badge ${state === "PAID" ? "badge-paid" : state === "OVERDUE" ? "badge-overdue" : "badge-due"}`}>{state.replace("_", " ")}</span></p></div>
          </div>;
        })}
        {!current?.rentCharges.length && <div className="p-6"><strong>No rent charges yet</strong><p className="muted text-sm">Monthly rent generation will populate this history.</p></div>}
      </div>
    </section>
  </div>;
}
