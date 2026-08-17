"use server";
import { revalidatePath } from "next/cache";
import { requireOwner } from "@/lib/auth";
import { db } from "@/lib/db";

export async function generateCurrentRent() {
  const { owner, user } = await requireOwner();
  const now = new Date();
  const billingMonth = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1));
  const tenancies = await db.tenancy.findMany({ where: { status: "ACTIVE", tenant: { ownerId: owner.id } } });
  await db.$transaction(async (tx) => {
    for (const tenancy of tenancies) {
      const dueDate = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), tenancy.dueDay));
      await tx.rentCharge.upsert({ where: { tenancyId_billingMonth: { tenancyId: tenancy.id, billingMonth } }, update: {}, create: { tenancyId: tenancy.id, billingMonth, amount: tenancy.monthlyRent, dueDate } });
    }
    await tx.activityLog.create({ data: { ownerId: owner.id, actorUserId: user.id, type: "RENT_GENERATED", entityType: "RentCharge", entityId: billingMonth.toISOString(), metadata: { count: tenancies.length } } });
  });
  revalidatePath("/rent"); revalidatePath("/dashboard");
}

export async function recordPayment(formData: FormData) {
  const { owner, user } = await requireOwner();
  const rentChargeId = String(formData.get("rentChargeId") ?? "");
  const amount = Number(formData.get("amount"));
  const method = String(formData.get("method") ?? "UPI") as "UPI"|"BANK_TRANSFER"|"CASH"|"CHEQUE"|"OTHER";
  const charge = await db.rentCharge.findFirst({ where: { id: rentChargeId, tenancy: { tenant: { ownerId: owner.id } } }, include: { payments: true } });
  if (!charge || !Number.isFinite(amount) || amount <= 0) throw new Error("Invalid payment");
  await db.$transaction([
    db.payment.create({ data: { rentChargeId, amount, paidAt: new Date(), method, referenceId: String(formData.get("referenceId") || "") || null } }),
    db.activityLog.create({ data: { ownerId: owner.id, actorUserId: user.id, type: "PAYMENT_RECORDED", entityType: "RentCharge", entityId: charge.id, metadata: { amount, method } } }),
  ]);
  revalidatePath("/rent"); revalidatePath("/dashboard");
}
