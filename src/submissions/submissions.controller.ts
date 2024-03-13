import { Controller, Get, Param, Query } from '@nestjs/common';
import { SubmissionsService } from './submissions.service';
import { SubmissionsFilterParamsDTO } from './input/SubmissionsFilterParamsDTO';

@Controller('/')
export class SubmissionsController {
  constructor(private readonly submissionsService: SubmissionsService) {}

  @Get(':id/filteredResponses')
  async findAllFilteredFormSubmissions(
    @Query() params: SubmissionsFilterParamsDTO,
    @Param('id') id: string,
  ) {
    return this.submissionsService.findAllFilteredFormSubmissions(params, id);
  }
}
