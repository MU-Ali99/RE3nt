export const canOwnerAccess = (sessionOwnerId:string, resourceOwnerId:string) => sessionOwnerId===resourceOwnerId;
export const canTenantAccess = (sessionTenantId:string, resourceTenantId:string) => sessionTenantId===resourceTenantId;
export const canCreateMaintenance = (sessionTenantId:string, tenancy:{tenantId:string;status:string}) => tenancy.tenantId===sessionTenantId&&tenancy.status==="ACTIVE";
