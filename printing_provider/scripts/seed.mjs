import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();

async function seedOrders() {
  try {
    // Fetch a user with the role 'USER'
    const user = await prisma.user.findFirst({
      where: { role: 'USER' },
    });

    if (!user) {
      throw new Error('No user with role USER found. Make sure you have a user in the database.');
    }

    // Fetch a design related to the user
    const designId = "cm61ve29j000aw5749vti8y9i"

    // Seed 10 orders
    const orders = Array.from({ length: 10 }, (_, i) => ({
      userId: user.id,
      designId: designId,
      customMessage: `Custom message for order ${i + 1}`,
      printStatus: 'PENDING',
      status: 'PENDING',
      recipientName: `Recipient ${i + 1}`,
      recipientAddress: `Address ${i + 1}`,
    }));

    await prisma.order.createMany({
      data: orders,
    });

    console.log('Seeded 10 orders successfully!');
  } catch (error) {
    console.error('Error seeding orders:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seedOrders();
