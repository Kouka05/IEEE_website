import Observer from '../Observer/Observer';

export default class Publisher {
  private observers: Observer[] = [];

  addObserver(observer: Observer): void {
    this.observers.push(observer);
  }

  removeObserver(observer: Observer): void {
    this.observers = this.observers.filter(obs => obs !== observer);
  }

  notifyObservers(event: any): void {
    for (const observer of this.observers) {
      observer.update(event);
    }
  }

  update(event: any): void {
    
  }
}
