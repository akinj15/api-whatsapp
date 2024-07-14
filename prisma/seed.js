const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

// async function main() {
//   const user = await prisma.role.upsert({
//     where: { name: 'USER' },
//     update: {},
//     create: {
//       name: 'USER',
//       color: '#FFFFFF',
//       keywords: '',
//     },
//   })
//   const admin = await prisma.role.upsert({
//     where: { name: 'ADMIN' },
//     update: {},
//     create: {
//       name: 'ADMIN',
//         color: '#f23d3d',
//       keywords: '',
//     },
//   })
//   console.log([user, admin])
// }
// main()
//   .then(async () => {
//     await prisma.$disconnect()
//   })
//   .catch(async (e) => {
//     console.error(e)
//     await prisma.$disconnect()
//     process.exit(1)
//   })

