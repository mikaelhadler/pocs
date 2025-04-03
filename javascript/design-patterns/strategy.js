class Shipping {
  setStrategy(strategy) {
    this.strategy = strategy;
  }

  calculate(pkg) {
    return this.strategy.calculate(pkg);
  }
}

class StandardShipping {
  calculate(pkg) {
    return pkg.weight * 1.5;
  }
}

class ExpressShipping {
  calculate(pkg) {
    return pkg.weight * 3;
  }
}

const pkg = { weight: 10 };

const shipping = new Shipping();

shipping.setStrategy(new StandardShipping());
console.log('Default tax:', shipping.calculate(pkg));

shipping.setStrategy(new ExpressShipping());
console.log('Tax express:', shipping.calculate(pkg));
