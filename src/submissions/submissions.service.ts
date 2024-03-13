import { Injectable } from '@nestjs/common';
import { SubmissionsFilterParams } from './input/SubmissionsFilterParams';
import { FilloutService } from 'src/fillout/fillout.service';
import { filterFormSubmissionsByFilter } from './adapters';

@Injectable()
export class SubmissionsService {
  constructor(private filloutService: FilloutService) {}

  async findAllFilteredFormSubmissions(
    { filters, ...params }: SubmissionsFilterParams,
    id: string,
  ) {
    const data = await this.filloutService.findOneFormSubmissions(id, params);
    if (!filters) return data;

    const toFilteredFormSubmissions = filterFormSubmissionsByFilter(filters);
    const filteredResponses = toFilteredFormSubmissions(data.responses);
    return {
      pageCount: data.pageCount,
      responses: filteredResponses,
      totalResponses: filteredResponses.length,
    };
  }
}
