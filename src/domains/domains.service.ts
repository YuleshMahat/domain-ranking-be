import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DomainsService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.domain.findMany();
  }

  async getRankings(domains: string[]) {
    const results = {};
    for (const name of domains) {
      const domain = await this.prisma.domain.findUnique({
        where: { name },
        include: {
          rankings: {
            orderBy: { date: 'asc' },
          },
        },
      });

      if (!domain) {
        results[name] = null;
        continue;
      }

      results[name] = domain?.rankings ?? null;
    }

    return results;
  }
}
