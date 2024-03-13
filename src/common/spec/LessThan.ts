import { AbstractSpecification } from '.';

export class LessThan<T> extends AbstractSpecification<T> {
  private value: number;
  private getValue: (item: T) => number | undefined;

  public constructor(value: number, getValue: (item: T) => number | undefined) {
    super();
    this.value = value;
    this.getValue = getValue;
  }

  public isSatisfiedBy(item: T): boolean {
    const itemValue = this.getValue(item);
    return !!itemValue && itemValue < this.value;
  }
}
