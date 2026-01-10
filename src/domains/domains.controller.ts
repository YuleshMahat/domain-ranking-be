import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Query,
} from '@nestjs/common';
import { DomainsService } from './domains.service';

@Controller('domains')
export class DomainsController {
  constructor(private domainsService: DomainsService) {}

  @Get()
  getDomains() {
    return this.domainsService.findAll();
  }

  @Post('rankings')
  async getRankings(@Body('domains') domains: string[]) {
    const isValidInput = this.domainsService.inputValidation(domains);

    if (isValidInput[0] === 'error')
      throw new BadRequestException({
        message: 'Domain input is invalid',
        invalidDomains: isValidInput[1],
      });

    const rankings = await this.domainsService.getRankings(domains);
    if (rankings)
      return { message: 'Rankings fetched', status: 'success', data: rankings };
    return { message: 'Internal server error', status: 'error' };
  }
}
