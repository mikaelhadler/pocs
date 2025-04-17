export interface Vehicle {
    type: string;
    make: string;
    model: string;
    year: number;
    color: string;
    getSpecs(): {
      icon: string;
      specs: {
        [key: string]: string | number;
      };
      features: string[];
    };
  }
  
  export class Car implements Vehicle {
    type = 'car';
    
    constructor(
      public make: string,
      public model: string,
      public year: number,
      public color: string,
      private engineType: string,
      private transmission: string
    ) {}
  
    getSpecs() {
      return {
        icon: '🚗',
        specs: {
          'Engine Type': this.engineType,
          'Transmission': this.transmission,
          'Doors': 4,
          'Seats': 5
        },
        features: [
          'Air Conditioning',
          'Power Windows',
          'Bluetooth Connectivity',
          'Backup Camera'
        ]
      };
    }
  }
  
  export class Motorcycle implements Vehicle {
    type = 'motorcycle';
    
    constructor(
      public make: string,
      public model: string,
      public year: number,
      public color: string,
      private engineCC: number,
      private bikeType: string
    ) {}
  
    getSpecs() {
      return {
        icon: '🏍️',
        specs: {
          'Engine': `${this.engineCC}cc`,
          'Type': this.bikeType,
          'Seats': 2,
          'Fuel Capacity': '4.5 gallons'
        },
        features: [
          'ABS Braking',
          'LED Lighting',
          'Digital Dashboard',
          'Quick Shifter'
        ]
      };
    }
  }
  
  export class Truck implements Vehicle {
    type = 'truck';
    
    constructor(
      public make: string,
      public model: string,
      public year: number,
      public color: string,
      private bedLength: string,
      private towingCapacity: string
    ) {}
  
    getSpecs() {
      return {
        icon: '🚛',
        specs: {
          'Bed Length': this.bedLength,
          'Towing Capacity': this.towingCapacity,
          'Seats': 6,
          'Fuel Type': 'Diesel'
        },
        features: [
          'Trailer Brake Control',
          '4x4 Capability',
          'Bed Liner',
          'Tow Hooks'
        ]
      };
    }
  }
  
  export class VehicleFactory {
    static createVehicle(config: {
      type: string;
      make: string;
      model: string;
      year: number;
      color: string;
      [key: string]: any;
    }): Vehicle {
      switch (config.type) {
        case 'car':
          return new Car(
            config.make,
            config.model,
            config.year,
            config.color,
            config.engineType,
            config.transmission
          );
        case 'motorcycle':
          return new Motorcycle(
            config.make,
            config.model,
            config.year,
            config.color,
            config.engineCC,
            config.bikeType
          );
        case 'truck':
          return new Truck(
            config.make,
            config.model,
            config.year,
            config.color,
            config.bedLength,
            config.towingCapacity
          );
        default:
          throw new Error(`Unknown vehicle type: ${config.type}`);
      }
    }
  }