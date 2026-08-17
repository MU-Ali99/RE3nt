import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createHash, randomBytes } from "crypto";
import { db } from "@/lib/db";

const COOKIE = "rent_manager_session";
const hash = (token: string) => createHash("sha256").update(token).digest("hex");
export async function createSession(userId: string) {
  const token = randomBytes(32).toString("base64url");
  const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30);
  await db.session.create({ data: { userId, tokenHash: hash(token), expiresAt } });
  (await cookies()).set(COOKIE, token, { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", path: "/", expires: expiresAt });
}
export async function getSessionUser() {
  const token = (await cookies()).get(COOKIE)?.value;
  if (!token) return null;
  const session = await db.session.findUnique({ where: { tokenHash: hash(token) }, include: { user: { include: { ownerProfile: true, tenantProfile: true } } } });
  if (!session || session.expiresAt <= new Date()) return null;
  return session.user;
}
export async function requireOwner() {
  const user = await getSessionUser();
  if (!user) redirect("/login");
  if (user.role !== "OWNER" || !user.ownerProfile) redirect("/portal");
  return { user, owner: user.ownerProfile };
}
export async function signOut() {
  const token = (await cookies()).get(COOKIE)?.value;
  if (token) await db.session.deleteMany({ where: { tokenHash: hash(token) } });
  (await cookies()).delete(COOKIE);
  redirect("/login");
}
