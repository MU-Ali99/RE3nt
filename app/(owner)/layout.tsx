import { requireOwner } from "@/lib/auth";
import { AppShell } from "@/components/app-shell";
export default async function OwnerLayout({children}:{children:React.ReactNode}){ const {owner}=await requireOwner(); return <AppShell ownerName={owner.fullName}>{children}</AppShell> }
