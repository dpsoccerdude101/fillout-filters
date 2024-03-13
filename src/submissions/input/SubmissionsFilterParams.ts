import { z as zod } from 'zod';
import SubmissionsFilterParamsSchema from './SubmissionsFilterParamsSchema';

export type SubmissionsFilterParams = zod.infer<
  typeof SubmissionsFilterParamsSchema
>;
