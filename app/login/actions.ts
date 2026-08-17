"use server";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { createSession } from "@/lib/auth";
import { loginSchema } from "@/lib/validation";
export async function login(_: {error?:string}|undefined, formData:FormData) {
  const parsed=loginSchema.safeParse(Object.fromEntries(formData));
  if(!parsed.success) return {error:"Enter a valid email and password."};
  const user=await db.user.findUnique({where:{email:parsed.data.email.toLowerCase()}});
  if(!user || !(await bcrypt.compare(parsed.data.password,user.passwordHash))) return {error:"Email or password is incorrect."};
  await createSession(user.id); redirect(user.role==="OWNER"?"/dashboard":"/portal");
}
