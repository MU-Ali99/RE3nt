type Charge = { amount: number; dueDate: Date; payments: { amount: number }[] };
export type RentState = "UPCOMING" | "DUE_SOON" | "DUE" | "OVERDUE" | "PAID";
export function paidAmount(charge: Charge) { return charge.payments.reduce((sum, payment) => sum + Number(payment.amount), 0); }
export function rentState(charge: Charge, now = new Date()): RentState {
  if (paidAmount(charge) >= Number(charge.amount)) return "PAID";
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const due = new Date(charge.dueDate.getFullYear(), charge.dueDate.getMonth(), charge.dueDate.getDate());
  const days = Math.ceil((due.getTime() - today.getTime()) / 86_400_000);
  if (days < 0) return "OVERDUE";
  if (days === 0) return "DUE";
  if (days <= 3) return "DUE_SOON";
  return "UPCOMING";
}
