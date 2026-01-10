import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class NormalizeDomainsPipe implements PipeTransform {
  transform(domains: string[]): string[] {
    if (!Array.isArray(domains)) {
      throw new BadRequestException('Domains must be an array');
    }

    return domains.map((domain) =>
      domain
        .trim()
        .toLowerCase()
        .replace(/^https?:\/\//, '')
        .replace(/^www\./, '')
        .replace(/\/$/, ''),
    );
  }
}
