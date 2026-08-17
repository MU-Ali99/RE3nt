import { PrismaClient, Role, PropertyType, UnitStatus, TenancyStatus, PaymentMethod, MaintenanceCategory, MaintenancePriority } from "@prisma/client";
import bcrypt from "bcryptjs";
const db = new PrismaClient();
const month = (offset=0) => new Date(Date.UTC(new Date().getUTCFullYear(), new Date().getUTCMonth()+offset, 1));
const due = (offset:number, day:number) => new Date(Date.UTC(new Date().getUTCFullYear(), new Date().getUTCMonth()+offset, day));

async function main() {
  await db.notification.deleteMany(); await db.activityLog.deleteMany(); await db.notice.deleteMany(); await db.maintenanceStatusHistory.deleteMany(); await db.maintenanceAttachment.deleteMany(); await db.maintenanceRequest.deleteMany(); await db.document.deleteMany(); await db.invitation.deleteMany(); await db.payment.deleteMany(); await db.rentCharge.deleteMany(); await db.tenancy.deleteMany(); await db.unit.deleteMany(); await db.property.deleteMany(); await db.tenantProfile.deleteMany(); await db.ownerProfile.deleteMany(); await db.session.deleteMany(); await db.user.deleteMany();
  const passwordHash = await bcrypt.hash("RentManager123!", 12);
  const user = await db.user.create({ data:{ email:"raj@example.com", passwordHash, role:Role.OWNER, ownerProfile:{create:{fullName:"Raj Kumar",phone:"+919876543210"}}}, include:{ownerProfile:true} });
  const ownerId = user.ownerProfile!.id;
  const property = await db.property.create({ data:{ownerId,name:"Green House",type:PropertyType.HOUSE,address:"14 Banjara Hills Road No. 3",city:"Hyderabad",state:"Telangana",pinCode:"500034",notes:"Quiet three-floor family property."} });
  const units = await Promise.all([
    db.unit.create({data:{propertyId:property.id,name:"Ground Floor",defaultRent:12500,status:UnitStatus.OCCUPIED}}),
    db.unit.create({data:{propertyId:property.id,name:"First Floor",defaultRent:15000,status:UnitStatus.OCCUPIED}}),
    db.unit.create({data:{propertyId:property.id,name:"Second Floor",defaultRent:15000,status:UnitStatus.OCCUPIED}}),
  ]);
  const people = [["Rahul Sharma","+919810001001"],["Arjun Khan","+919810001002"],["Priya Reddy","+919810001003"]] as const;
  for (let i=0;i<people.length;i++) {
    const tenant = await db.tenantProfile.create({data:{ownerId,fullName:people[i][0],phone:people[i][1],email:`tenant${i+1}@example.com`}});
    if(i===0){const tenantUser=await db.user.create({data:{email:"rahul@example.com",passwordHash:await bcrypt.hash("Tenant123!",12),role:Role.TENANT}});await db.tenantProfile.update({where:{id:tenant.id},data:{userId:tenantUser.id}})}
    const rent = i===0?12500:15000;
    const tenancy = await db.tenancy.create({data:{tenantId:tenant.id,unitId:units[i].id,monthlyRent:rent,dueDay:5,moveInDate:new Date("2025-01-01"),leaseStart:new Date("2025-01-01"),leaseEnd:new Date("2026-12-31"),securityDeposit:rent*2,status:TenancyStatus.ACTIVE}});
    const charge = await db.rentCharge.create({data:{tenancyId:tenancy.id,billingMonth:month(0),amount:rent,dueDate: i===1?due(0,5):i===2?due(0,20):due(0,1)}});
    if(i===0) await db.document.create({data:{tenancyId:tenancy.id,category:"RENTAL_AGREEMENT",name:"Rental Agreement — Green House",storageKey:"demo-rental-agreement.txt",mimeType:"text/plain",size:220,visibleToTenant:true}});
    if(i===0) await db.payment.create({data:{rentChargeId:charge.id,amount:rent,paidAt:new Date(),method:PaymentMethod.UPI,referenceId:"UPI-DEMO-001"}});
    if(i===1) await db.maintenanceRequest.create({data:{tenancyId:tenancy.id,category:MaintenanceCategory.PLUMBING,title:"Kitchen tap is leaking",description:"A steady drip has started under the kitchen sink.",priority:MaintenancePriority.NORMAL,history:{create:{status:"SUBMITTED"}}}});
  }
  await db.notice.create({data:{ownerId,propertyId:property.id,title:"Water Supply Maintenance",body:"Water will be unavailable tomorrow between 10 AM and 1 PM for scheduled maintenance."}});
  await db.activityLog.createMany({data:[{ownerId,type:"PROPERTY_CREATED",entityType:"Property",entityId:property.id,metadata:{name:"Green House"}},{ownerId,type:"TENANT_CREATED",entityType:"Property",entityId:property.id,metadata:{count:3}},{ownerId,type:"NOTICE_CREATED",entityType:"Property",entityId:property.id}]});
}
main().finally(()=>db.$disconnect());
