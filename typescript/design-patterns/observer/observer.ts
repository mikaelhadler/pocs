interface IObserver {
  update(data: any): void;
  name: string;
}

export class Subject {
  private observers: IObserver[] = [];

  constructor() {
    this.observers = [];
  }

  subscribe(observer: IObserver) {
    this.observers.push(observer);
  }

  unsubscribe(observer: IObserver) {
    this.observers = this.observers.filter((obs) => obs !== observer);
  }

  notify(data: any) {
    this.observers.forEach((observer) => observer.update(data));
  }
}

export class Observer implements IObserver {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  update(data: any) {
    console.log(`${this.name} receives: ${data}`);
  }
}
