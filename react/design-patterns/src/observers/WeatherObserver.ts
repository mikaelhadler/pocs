export interface WeatherObserver {
  update(temperature: number, humidity: number, pressure: number): void;
}

export interface WeatherSubject {
  registerObserver(observer: WeatherObserver): void;
  removeObserver(observer: WeatherObserver): void;
  notifyObservers(): void;
}