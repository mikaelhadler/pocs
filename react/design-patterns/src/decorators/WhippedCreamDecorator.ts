import { Coffee } from './Coffee';

export class WhippedCreamDecorator implements Coffee {
  constructor(private coffee: Coffee) {}

  getDescription(): string {
    return `${this.coffee.getDescription()} + Whipped Cream`;
  }

  getCost(): number {
    return this.coffee.getCost() + 1.00;
  }
}