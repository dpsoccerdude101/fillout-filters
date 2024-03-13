import { createZodDto } from 'nestjs-zod';
import SubmissionsFilterParamsSchema from './SubmissionsFilterParamsSchema';
import { SubmissionsFilterParams } from './SubmissionsFilterParams';

export class SubmissionsFilterParamsDTO
  extends createZodDto(SubmissionsFilterParamsSchema)
  implements SubmissionsFilterParams {}
