class Subject {
  constructor() {
    this.observers = [];
  }

  subscribe(observer) {
    this.observers.push(observer);
  }

  unsubscribe(observer) {
    this.observers = this.observers.filter((obs) => obs !== observer);
  }

  notify(data) {
    this.observers.forEach((observer) => observer.update(data));
  }
}

class Observer {
  constructor(name) {
    this.name = name;
  }

  update(data) {
    console.log(`${this.name} receives: ${data}`);
  }
}

const subject = new Subject();

const firstObserver = new Observer('João');
const secondObserver = new Observer('Maria');

subject.subscribe(firstObserver);
subject.subscribe(secondObserver);

subject.notify('New message');
