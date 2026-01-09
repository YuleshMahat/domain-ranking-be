import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const domains = [
    'google.com',
    'youtube.com',
    'facebook.com',
    'amazon.com',
    'wikipedia.org',
    'reddit.com',
    'twitter.com',
    'instagram.com',
    'linkedin.com',
    'netflix.com',
  ];

  for (const name of domains) {
    const domain = await prisma.domain.upsert({
      where: { name },
      update: {},
      create: { name },
    });

    // create rankings for last 7 days
    for (let i = 0; i < 7; i++) {
      await prisma.ranking.create({
        data: {
          rank: Math.floor(Math.random() * 100) + 1,
          date: new Date(Date.now() - i * 86400000),
          domainId: domain.id,
        },
      });
    }
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
