export interface DomainDB {
  id: number;
  name: string;
  rankings: Ranking[];
}

interface Ranking {
  id: number;
  rank: number;
  date: Date;
  domainId: number;
  createdAt: Date;
}
