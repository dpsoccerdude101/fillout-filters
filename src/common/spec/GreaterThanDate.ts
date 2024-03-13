import * as dayjs from 'dayjs';
import { AbstractSpecification } from '.';

export class GreaterThanDate<T> extends AbstractSpecification<T> {
  private date: string;
  private getDate: (item: T) => string | undefined;

  public constructor(date: string, getDate: (item: T) => string | undefined) {
    super();
    this.date = date;
    this.getDate = getDate;
  }

  public isSatisfiedBy(item: T): boolean {
    const itemDate = this.getDate(item);
    return !!itemDate && dayjs(itemDate).isAfter(dayjs(this.date));
  }
}
