// import { PrismaClient } from '@prisma/client';
// import roles from './data/roles.json';

// const prisma = new PrismaClient();

// const seedRoles = async () => {
//   console.log('--- Start seeding roles data ---');

//   await prisma.role.deleteMany();
//   for (const role of roles) {
//     await prisma.role.create({
//       data: {
//         name: role.name,
//       },
//     });

//     console.log('Created role', role.name);
//   }

//   console.log('Seeding roles data finished');
// };

// const seedUser = async () => {
//   console.log('--- Start seeding user data ---');

//   await prisma.user.deleteMany();
//   await prisma.user.create({
//     data: user,
//   });

//   console.log('Created user', user.email);
//   console.log('Seeding user data finished');
// };

// const main = async () => {
//   await seedRoles();
//   await seedUser();
// };

// main()
//   .then(async () => {
//     await prisma.$disconnect();
//   })
//   .catch(async (e) => {
//     console.error(e);
//     await prisma.$disconnect();
//     process.exit(1);
//   });
