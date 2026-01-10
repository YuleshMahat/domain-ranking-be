import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { PrismaService } from 'src/prisma/prisma.service';
import { DomainDB } from 'src/types';

@Injectable()
export class DomainsService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.domain.findMany();
  }

  inputValidation(domains: string[]) {
    const domainRegex = /^(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/;

    for (const name of domains) {
      if (!name || !domainRegex.test(name)) {
        return false;
      }
      const segments = name.split('.');
      if (segments[0].length < 3) return false;
    }

    return true;
  }

  async getRankings(domains: string[]) {
    const results: Record<string, any> = {};
    for (const name of domains) {
      let domain = await this.readRankings(name);

      if (!domain || domain.rankings.length === 0) {
        //fire an API to trensco to get the rankings

        console.log(
          'No domain in the database. OR expired domain. Fetching the data.',
        );

        const newRankings = await this.fetchRankingFromApi(name);

        await this.createRankings(name, newRankings.ranks);

        domain = await this.readRankings(name);
      }
      results[name] = domain
        ? domain.rankings.map((r) => ({
            rank: r.rank,
            date: r.date.toISOString().split('T')[0],
          }))
        : null;
    }

    return results;
  }

  async createRankings(
    domainName: string,
    rankings: { date: string; rank: number }[],
  ) {
    //upload the domain first and get its id to reference in rankings table
    const domain = await this.prisma.domain.upsert({
      where: { name: domainName },
      update: {},
      create: { name: domainName },
    });

    //prepare each row of rankings insertion
    const rankingData = rankings.map((r) => ({
      domainId: domain.id,
      rank: r.rank,
      date: new Date(r.date),
    }));

    //delete old ranking if any
    const deletedRankings = await this.prisma.ranking.deleteMany({
      where: {
        domainId: domain.id,
        date: { in: rankingData.map((r) => r.date) },
      },
    });

    //upload rankings in the rankings table
    const rankingsUpload = await this.prisma.ranking.createMany({
      data: rankingData,
      skipDuplicates: true,
    });

    return { domain: domain.name, inserted: rankingData.length };
  }

  async readRankings(name: string): Promise<DomainDB | null> {
    const last24Hours = new Date(Date.now() - 24 * 60 * 60 * 1000);

    return this.prisma.domain.findUnique({
      where: { name },
      include: {
        rankings: {
          where: {
            createdAt: { gte: last24Hours },
          },
          orderBy: { date: 'asc' },
        },
      },
    });
  }

  async fetchRankingFromApi(
    domain: string,
  ): Promise<{ ranks: Array<{ date: string; rank: number; domain: string }> }> {
    const newDomain = await axios.get(
      process.env.TRANSCO_API_URL + '/' + domain,
    );

    return newDomain.data;
  }
}
