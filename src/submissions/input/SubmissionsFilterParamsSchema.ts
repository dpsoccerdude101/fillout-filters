import { json, z } from 'nestjs-zod/z';
import FilterClauseSchema from 'src/common/FilterClauseSchema';

const StringToJSONSchema = z
  .string()
  .transform((str, ctx): z.infer<ReturnType<typeof json>> => {
    try {
      return JSON.parse(str);
    } catch (e) {
      ctx.addIssue({ code: 'custom', message: 'Invalid JSON' });
      return z.NEVER;
    }
  });

const SubmissionsFilterParamsSchema = z.object({
  filters: StringToJSONSchema.pipe(z.array(FilterClauseSchema)).optional(),
  limit: z.coerce.number().int().min(1).max(150).optional(),
  afterDate: z.dateString().format('date-time').optional(),
  beforeDate: z.dateString().format('date-time').optional(),
  offset: z.coerce.number().int().optional(),
  status: z.enum(['in_progress', 'finished']).optional(),
  includeEditLink: z
    .string()
    .or(z.coerce.boolean())
    .transform((x) => (typeof x === 'string' ? x === 'true' : x))
    .optional(),
  sort: z.enum(['asc', 'desc']).optional(),
});

export default SubmissionsFilterParamsSchema;
