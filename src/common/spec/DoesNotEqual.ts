import { AbstractSpecification } from '.';

export class DoesNotEqual<T> extends AbstractSpecification<T> {
  private value: string | number;
  private getValue: (item: T) => string | number | undefined;

  public constructor(
    value: string | number,
    getValue: (item: T) => string | number | undefined,
  ) {
    super();
    this.value = value;
    this.getValue = getValue;
  }

  public isSatisfiedBy(item: T): boolean {
    const itemValue = this.getValue(item);
    return itemValue !== this.value;
  }
}
