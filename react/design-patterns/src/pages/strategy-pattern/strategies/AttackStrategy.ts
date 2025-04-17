export interface AttackStrategy {
    execute(): {
      damage: number;
      description: string;
      animation: string;
    };
  }
  
  export class SwordAttackStrategy implements AttackStrategy {
    execute() {
      return {
        damage: Math.floor(Math.random() * 15) + 10,
        description: "Slashes with a mighty sword",
        animation: "⚔️"
      };
    }
  }
  
  export class MagicAttackStrategy implements AttackStrategy {
    execute() {
      return {
        damage: Math.floor(Math.random() * 25) + 5,
        description: "Casts a powerful spell",
        animation: "🔮"
      };
    }
  }
  
  export class ArcherAttackStrategy implements AttackStrategy {
    execute() {
      return {
        damage: Math.floor(Math.random() * 20) + 8,
        description: "Fires a precise arrow",
        animation: "🏹"
      };
    }
  }
  
  export class Character {
    private strategy: AttackStrategy;
    
    constructor(strategy: AttackStrategy) {
      this.strategy = strategy;
    }
  
    setStrategy(strategy: AttackStrategy) {
      this.strategy = strategy;
    }
  
    attack() {
      return this.strategy.execute();
    }
  }