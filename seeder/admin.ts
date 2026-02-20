import { PrismaPg } from '@prisma/adapter-pg';
import 'dotenv/config';
import * as bcrypt from 'bcrypt';  
import {PrismaClient} from "../prisma/generated/client"     

const adapter = new PrismaPg({      
  connectionString: process.env.DATABASE_URL as string,  
});

const prisma = new PrismaClient({ adapter });  

// You can adjust these values (especially passwords!)
const seedData = [
  {
    name: 'Super Admin',
    email: 'superadmin@example.com',
    password: 'superadmin123',
    region: "Lagos",
    phoneNumber: "09876556789",
    role: 'SUPER_ADMIN',
  },
  {
    name: 'Admin One',
    email: 'admin1@example.com',
    password: 'AdminPass456!',
    region: "Ibadan",
    phoneNumber: "09876543238",
    role: 'ADMIN',
  },
  // Add more if needed 
];

async function hashPassword(plainText: string): Promise<string> {
  const saltRounds = 12;
  return bcrypt.hash(plainText, saltRounds);
}

async function main() {
  console.log('🌱 Starting admin seed...');

  try {

    for (const userData of seedData) {
      const hashedPassword = await hashPassword(userData.password);

      // Upsert = create if not exists, update if exists (by email)
      const user = await prisma.user.upsert({
        where: { email: userData.email },
        update: {
          name: userData.name,
          password: hashedPassword,
          role: userData.role as any,
        },
        create: {
          name: userData.name,
          email: userData.email,
          password: hashedPassword,
          region: userData.region,
          phoneNumber: userData.phoneNumber,
          role: userData.role as any,
        },
      });

      console.log(`✅ ${user.role.padEnd(12)} created / updated → ${user.email}`);
    }

    console.log('🌱 Admin seed completed successfully!');
  } catch (error) {
    console.error('❌ Seed failed:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();   
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });