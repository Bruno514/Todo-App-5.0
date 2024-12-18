import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const alice = await prisma.user.upsert({
    where: { email: "alice@prisma.io" },
    update: {},
    create: {
      email: "alice@prisma.io",
      name: "Alice",
      password: "alice123",
      tasks: {
        create: {
          title: "Check out Prisma with Next.js",
          description: "https://www.prisma.io/nextjs",
          completed: false,
        },
      },
    },
  });
  const bob = await prisma.user.upsert({
    where: { email: "bob@prisma.io" },
    update: {},
    create: {
      email: "bob@prisma.io",
      name: "Bob",
      password: "bob123",
      tasks: {
        create: {
          title: "Check out Prisma with Next.js",
          description: "https://www.prisma.io/nextjs",
          completed: true,
        },
      },
    },
  });

  console.log({ alice, bob });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
