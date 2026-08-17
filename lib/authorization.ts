import { db } from "@/lib/db";
export async function ownerProperty(ownerId: string, propertyId: string) {
  return db.property.findFirst({ where: { id: propertyId, ownerId, archivedAt: null } });
}
export async function ownerTenant(ownerId: string, tenantId: string) {
  return db.tenantProfile.findFirst({ where: { id: tenantId, ownerId, archivedAt: null } });
}
export async function tenantTenancy(tenantProfileId: string, tenancyId: string) {
  return db.tenancy.findFirst({ where: { id: tenancyId, tenantId: tenantProfileId } });
}
