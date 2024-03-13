import { z as zod } from 'zod';
import FilterClauseSchema from './FilterClauseSchema';

export type FilterClause = zod.infer<typeof FilterClauseSchema>;
