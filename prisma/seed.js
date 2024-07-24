const { PrismaClient } = require("@prisma/client");
const bcryptjs = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  const password = await bcryptjs.hash("12345678", 8);

  const user = await prisma.role.upsert({
    where: { name: "USER" },
    update: {},
    create: {
      name: "USER",
      color: "#FFFFFF",
      keywords: "",
    },
  });
  const admin = await prisma.role.upsert({
    where: { name: "ADMIN" },
    update: {},
    create: {
      name: "ADMIN",
      color: "#f23d3d",
      keywords: "",
    },
  });
  const adminUser = await prisma.user.upsert({
    where: { email: "admin@admin.com" },
    update: {},
    create: {
      email: "admin@admin.com",
      username: "admin",
      firstname: "admin",
      lastname: "admin",
      roleId: admin.id,
      surname: "admin",
      password: password,
    },
  });
  console.log([adminUser, user, admin]);
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
