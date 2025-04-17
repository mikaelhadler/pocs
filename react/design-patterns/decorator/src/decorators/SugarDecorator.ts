import { Coffee } from './Coffee';

export class SugarDecorator implements Coffee {
  constructor(private coffee: Coffee) {}

  getDescription(): string {
    return `${this.coffee.getDescription()} + Sugar`;
  }

  getCost(): number {
    return this.coffee.getCost() + 0.25;
  }
}