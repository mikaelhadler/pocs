import { describe, it } from 'node:test';
import assert from 'node:assert';
import { Subject, Observer } from './observer.js';

describe('Observer Pattern', () => {
  it('should notify observers with actual console output', () => {
    const subject = new Subject();
    const observer = new Observer('João');
    let loggedMessage = '';

    const originalConsoleLog = console.log;
    console.log = (msg: string) => { loggedMessage = msg; };

    subject.subscribe(observer);
    subject.notify('test message');

    console.log = originalConsoleLog;
    assert.strictEqual(loggedMessage, 'João receives: test message');
  });

  it('should unsubscribe an observer', () => {
    const subject = new Subject();
    const observer = new Observer('João');
    const originalConsoleLog = console.log;
    let wasLogged = false;

    console.log = () => { wasLogged = true; };
    subject.subscribe(observer);
    subject.unsubscribe(observer);
    subject.notify('test message');
    console.log = originalConsoleLog;

    assert.strictEqual(wasLogged, false);
  });

  it('should handle multiple observers', () => {
    const subject = new Subject();
    const observer1 = new Observer('João');
    const observer2 = new Observer('Maria');
    const messages: string[] = [];
    const originalConsoleLog = console.log;

    console.log = (msg: string) => messages.push(msg);

    subject.subscribe(observer1);
    subject.subscribe(observer2);
    subject.notify('Hello');

    console.log = originalConsoleLog;

    assert.strictEqual(messages.length, 2);
    assert.strictEqual(messages[0], 'João receives: Hello');
    assert.strictEqual(messages[1], 'Maria receives: Hello');
  });
});
