// const { PrismaClient } = require('@prisma/client');
// const prisma = new PrismaClient();

// async function seedRoles() {
//     try {
//         const adminRole = await prisma.role.findUnique({ where: { user_role: 'Admin' } });

//         if (!adminRole) {
//             await prisma.role.create({
//                 data: {
//                     user_role: 'Admin'
//                 }
//             });
//             console.log("Admin role created.");
//         } else {
//             console.log("Admin role already exists.");
//         }
//     } catch (err) {
//         console.error("Error seeding roles:", err.message);
//     } finally {
//         await prisma.$disconnect();
//     }
// }

// module.exports = seedRoles;
