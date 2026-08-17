import { createHash, randomBytes } from "crypto";
export const invitationToken = () => randomBytes(32).toString("base64url");
export const tokenHash = (value:string) => createHash("sha256").update(value).digest("hex");
export function invitationUsable(invitation:{status:"PENDING"|"ACCEPTED"|"REVOKED";expiresAt:Date},now=new Date()){return invitation.status==="PENDING"&&invitation.expiresAt>now}
