export interface Specification<T> {
  isSatisfiedBy(candidate: T): boolean;
  and(other: Specification<T>): Specification<T>;
  not(): Specification<T>;
}
export abstract class AbstractSpecification<T> implements Specification<T> {
  public abstract isSatisfiedBy(candidate: T): boolean;

  public and(other: Specification<T>): Specification<T> {
    return new AndSpecification(this, other);
  }

  public not(): Specification<T> {
    return new NotSpecification(this);
  }
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class Specification<T> extends AbstractSpecification<T> {
  public constructor() {
    super();
  }

  public isSatisfiedBy(_: T): boolean {
    return true;
  }
}

class AndSpecification<T> extends AbstractSpecification<T> {
  private one: Specification<T>;
  private other: Specification<T>;

  public constructor(one: Specification<T>, other: Specification<T>) {
    super();
    this.one = one;
    this.other = other;
  }

  public isSatisfiedBy(candidate: T) {
    return (
      this.one.isSatisfiedBy(candidate) && this.other.isSatisfiedBy(candidate)
    );
  }
}

class NotSpecification<T> extends AbstractSpecification<T> {
  private wrapped: Specification<T>;

  public constructor(wrapped: Specification<T>) {
    super();
    this.wrapped = wrapped;
  }

  public isSatisfiedBy(candidate: T) {
    return !this.wrapped.isSatisfiedBy(candidate);
  }
}
