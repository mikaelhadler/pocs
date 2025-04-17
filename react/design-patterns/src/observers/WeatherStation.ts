import { WeatherObserver, WeatherSubject } from './WeatherObserver';

export class WeatherStation implements WeatherSubject {
  private observers: WeatherObserver[] = [];
  private temperature: number = 0;
  private humidity: number = 0;
  private pressure: number = 0;

  registerObserver(observer: WeatherObserver): void {
    this.observers.push(observer);
  }

  removeObserver(observer: WeatherObserver): void {
    const index = this.observers.indexOf(observer);
    if (index > -1) {
      this.observers.splice(index, 1);
    }
  }

  notifyObservers(): void {
    for (const observer of this.observers) {
      observer.update(this.temperature, this.humidity, this.pressure);
    }
  }

  setMeasurements(temperature: number, humidity: number, pressure: number): void {
    this.temperature = temperature;
    this.humidity = humidity;
    this.pressure = pressure;
    this.notifyObservers();
  }

  // Simulate random weather changes
  startWeatherSimulation(): void {
    setInterval(() => {
      this.setMeasurements(
        Math.round((Math.random() * 30 + 10) * 10) / 10, // Temperature between 10-40°C
        Math.round(Math.random() * 100), // Humidity between 0-100%
        Math.round((Math.random() * 50 + 970) * 10) / 10 // Pressure between 970-1020 hPa
      );
    }, 3000);
  }
}