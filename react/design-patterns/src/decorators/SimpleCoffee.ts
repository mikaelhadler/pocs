import { Coffee } from './Coffee';

export class SimpleCoffee implements Coffee {
  getDescription(): string {
    return "Simple Coffee";
  }

  getCost(): number {
    return 2.00;
  }
}