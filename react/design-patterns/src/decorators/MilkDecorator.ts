import { Coffee } from './Coffee';

export class MilkDecorator implements Coffee {
  constructor(private coffee: Coffee) {}

  getDescription(): string {
    return `${this.coffee.getDescription()} + Milk`;
  }

  getCost(): number {
    return this.coffee.getCost() + 0.50;
  }
}