interface ShippingStrategy {
  calculate(pkg: { weight: number }): number;
}

export class Shipping {
  private strategy!: ShippingStrategy;

  setStrategy(strategy: ShippingStrategy) {
    this.strategy = strategy;
  }

  calculate(pkg: { weight: number }) {
    return this.strategy.calculate(pkg);
  }
}

export class StandardShipping implements ShippingStrategy {
  calculate(pkg: { weight: number }) {
    return pkg.weight * 1.5;
  }
}

export class ExpressShipping implements ShippingStrategy {
  calculate(pkg: { weight: number }) {
    return pkg.weight * 3;
  }
}