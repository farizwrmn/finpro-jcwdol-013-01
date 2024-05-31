import { PrismaClient } from '@prisma/client';
import roles from './data/roles.json';
import users from './data/users.json';
import { genSalt, hash, compare } from 'bcrypt'

const prisma = new PrismaClient();

const seedRoles = async () => {
  console.log('--- Start seeding roles data ---');

  await prisma.role.deleteMany();
  for (const role of roles) {
    await prisma.role.create({
      data: {
        name: role.name,
      },
    });

    console.log('Created role', role.name);
  }

  console.log('Seeding roles data finished');
};

const seedUsers = async () => {
  console.log('--- Start seeding users data ---');

  await prisma.user.deleteMany();
  for (const user of users) {
    const salt = await genSalt(10);
    const hashPassword = await hash(user.password, salt);

    await prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: hashPassword,
        isVerified: true,
        role: {
          connect: {
            name: "super_admin"
          }
        }
      },
    });

    console.log('Created user', user.name);
  }

  console.log('Seeding users data finished');
};

const main = async () => {
  await seedRoles();
  await seedUsers();
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
