import { describe, it } from 'node:test';
import assert from 'node:assert';
import { Shipping, StandardShipping, ExpressShipping } from './strategy.js';

describe('Strategy Pattern', () => {
    it('should calculate standard shipping cost correctly', () => {
        const shipping = new Shipping();
        const standardStrategy = new StandardShipping();
        shipping.setStrategy(standardStrategy);

        const package1 = { weight: 10 };
        const cost = shipping.calculate(package1);

        assert.strictEqual(cost, 15);
    });

    it('should calculate express shipping cost correctly', () => {
        const shipping = new Shipping();
        const expressStrategy = new ExpressShipping();
        shipping.setStrategy(expressStrategy);

        const package1 = { weight: 10 };
        const cost = shipping.calculate(package1);

        assert.strictEqual(cost, 30);
    });

    it('should allow switching between shipping strategies', () => {
        const shipping = new Shipping();
        const standardStrategy = new StandardShipping();
        const expressStrategy = new ExpressShipping();

        shipping.setStrategy(standardStrategy);
        const standardCost = shipping.calculate({ weight: 10 });
        assert.strictEqual(standardCost, 15);

        shipping.setStrategy(expressStrategy);
        const expressCost = shipping.calculate({ weight: 10 });
        assert.strictEqual(expressCost, 30);
    });
});