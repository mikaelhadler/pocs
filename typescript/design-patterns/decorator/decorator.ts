export interface Coffee {
    getDescription(): string;
    getCost(): number;
}

export class SimpleCoffee implements Coffee {
    getDescription(): string {
        return "Simple Coffee";
    }

    getCost(): number {
        return 2.00;
    }
}

export class MilkDecorator implements Coffee {
    constructor(private coffee: Coffee) { }

    getDescription(): string {
        return `${this.coffee.getDescription()} + Milk`;
    }

    getCost(): number {
        return this.coffee.getCost() + 0.50;
    }
}

export class SugarDecorator implements Coffee {
    constructor(private coffee: Coffee) { }

    getDescription(): string {
        return `${this.coffee.getDescription()} + Sugar`;
    }

    getCost(): number {
        return this.coffee.getCost() + 0.25;
    }
}

export class WhippedCreamDecorator implements Coffee {
    constructor(private coffee: Coffee) { }

    getDescription(): string {
        return `${this.coffee.getDescription()} + Whipped Cream`;
    }

    getCost(): number {
        return this.coffee.getCost() + 1.00;
    }
}

let coffe = new SimpleCoffee();

console.log(coffe.getCost());
console.log(coffe.getDescription());