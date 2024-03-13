import { z } from 'nestjs-zod/z';

const FilterClauseSchema = z.object({
  id: z.string(),
  condition: z.enum(['equals', 'does_not_equal', 'greater_than', 'less_than']),
  value: z.number().or(z.string()),
});

export default FilterClauseSchema;
