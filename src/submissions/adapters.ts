import { Specification } from 'src/common/spec';
import { FormSubmission } from 'src/fillout/types';
import { Equals } from 'src/common/spec/Equals';
import { DoesNotEqual } from 'src/common/spec/DoesNotEqual';
import { GreaterThan } from 'src/common/spec/GreaterThan';
import { FilterClause } from 'src/common/FilterClause';
import { GreaterThanDate } from 'src/common/spec/GreaterThanDate';
import { LessThanDate } from 'src/common/spec/LessThanDate';
import { LessThan } from 'src/common/spec/LessThan';
import { z as zod } from 'zod';

const extractQuestionValueById = (id: string) => (payload: FormSubmission) =>
  payload.questions.find((x) => x.id === id)?.value;

const isDate = (value: string | number) =>
  zod.string().datetime({ precision: 3 }).safeParse(value).success;

export const filterFormSubmissionsByFilter = (filters: FilterClause[]) => {
  let criteria = new Specification<FormSubmission>();

  filters.forEach(({ id, condition, value }) => {
    const extractValue = extractQuestionValueById(id);
    const extractValueAsNumber = (payload: FormSubmission) => {
      const value = extractValue(payload);
      if (!value || Number.isNaN(parseFloat(value))) return undefined;
      return parseFloat(value);
    };

    if (condition === 'equals') {
      criteria = criteria.and(new Equals<FormSubmission>(value, extractValue));
    }
    if (condition === 'does_not_equal') {
      criteria = criteria.and(
        new DoesNotEqual<FormSubmission>(value, extractValue),
      );
    }
    if (condition === 'greater_than') {
      if (typeof value === 'string' && isDate(value)) {
        criteria = criteria.and(
          new GreaterThanDate<FormSubmission>(value, extractValue),
        );
      } else {
        criteria = criteria.and(
          new GreaterThan<FormSubmission>(
            typeof value === 'number' ? value : parseFloat(value),
            extractValueAsNumber,
          ),
        );
      }
    }
    if (condition === 'less_than') {
      if (typeof value === 'string' && isDate(value)) {
        criteria = criteria.and(
          new LessThanDate<FormSubmission>(value, extractValue),
        );
      } else {
        criteria = criteria.and(
          new LessThan<FormSubmission>(
            typeof value === 'number' ? value : parseFloat(value),
            extractValueAsNumber,
          ),
        );
      }
    }
  });

  return (formSubmissions: Array<FormSubmission>) =>
    formSubmissions.filter((item) => criteria.isSatisfiedBy(item));
};
