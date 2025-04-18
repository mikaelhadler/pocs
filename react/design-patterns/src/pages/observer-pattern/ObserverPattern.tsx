import { useEffect, useState } from 'react';
import { WeatherStation } from '../../observers/WeatherStation';
import { WeatherObserver } from '../../observers/WeatherObserver';
import { Thermometer, Droplets, Gauge, ArrowUp, ArrowDown } from 'lucide-react';
import { BackButton } from '../../components/BackButton';
import { CodeViewer } from '../../components/CodeViewer';

const codeFiles = [
  {
    name: 'WeatherObserver.ts',
    language: 'typescript',
    code: `export interface WeatherObserver {
  update(temperature: number, humidity: number, pressure: number): void;
}

export interface WeatherSubject {
  registerObserver(observer: WeatherObserver): void;
  removeObserver(observer: WeatherObserver): void;
  notifyObservers(): void;
}`
  },
  {
    name: 'WeatherStation.ts',
    language: 'typescript',
    code: `import { WeatherObserver, WeatherSubject } from './WeatherObserver';

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

  startWeatherSimulation(): void {
    setInterval(() => {
      this.setMeasurements(
        Math.round((Math.random() * 30 + 10) * 10) / 10, // Temperature between 10-40°C
        Math.round(Math.random() * 100), // Humidity between 0-100%
        Math.round((Math.random() * 50 + 970) * 10) / 10 // Pressure between 970-1020 hPa
      );
    }, 3000);
  }
}`
  }
];

// Create display components as observers
class CurrentConditionsDisplay implements WeatherObserver {
  private callback: (temp: number, humidity: number, pressure: number) => void;

  constructor(callback: (temp: number, humidity: number, pressure: number) => void) {
    this.callback = callback;
  }

  update(temperature: number, humidity: number, pressure: number): void {
    this.callback(temperature, humidity, pressure);
  }
}

function WeatherObserverPage() {
  const [weatherStation] = useState(() => new WeatherStation());
  const [currentConditions, setCurrentConditions] = useState({
    temperature: 0,
    humidity: 0,
    pressure: 0
  });
  const [previousConditions, setPreviousConditions] = useState({
    temperature: 0,
    humidity: 0,
    pressure: 0
  });

  useEffect(() => {
    const display = new CurrentConditionsDisplay((temp, humidity, pressure) => {
      setPreviousConditions(currentConditions);
      setCurrentConditions({ temperature: temp, humidity, pressure });
    });

    weatherStation.registerObserver(display);
    weatherStation.startWeatherSimulation();

    return () => weatherStation.removeObserver(display);
  }, [weatherStation]);

  const getTrendIcon = (current: number, previous: number) => {
    if (current > previous) {
      return <ArrowUp className="w-4 h-4 text-red-500" />;
    } else if (current < previous) {
      return <ArrowDown className="w-4 h-4 text-blue-500" />;
    }
    return null;
  };

  const getTemperatureColor = (temp: number) => {
    if (temp <= 15) return 'text-blue-500';
    if (temp >= 30) return 'text-red-500';
    return 'text-amber-500';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100 flex flex-col items-center justify-center p-4 gap-4">
      <div className='flex flex-col items-left gap-4'>
        <BackButton color="gray-800" />
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Weather Station</h1>

          <div className="grid grid-cols-1 gap-6 min-w-80">
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Thermometer className="w-6 h-6 text-gray-600" />
                  <h2 className="text-lg font-semibold text-gray-700">Temperature</h2>
                </div>
                {getTrendIcon(currentConditions.temperature, previousConditions.temperature)}
              </div>
              <p className={`text-3xl font-bold ${getTemperatureColor(currentConditions.temperature)}`}>
                {currentConditions.temperature}°C
              </p>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Droplets className="w-6 h-6 text-gray-600" />
                  <h2 className="text-lg font-semibold text-gray-700">Humidity</h2>
                </div>
                {getTrendIcon(currentConditions.humidity, previousConditions.humidity)}
              </div>
              <p className="text-3xl font-bold text-blue-600">
                {currentConditions.humidity}%
              </p>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Gauge className="w-6 h-6 text-gray-600" />
                  <h2 className="text-lg font-semibold text-gray-700">Pressure</h2>
                </div>
                {getTrendIcon(currentConditions.pressure, previousConditions.pressure)}
              </div>
              <p className="text-3xl font-bold text-purple-600">
                {currentConditions.pressure} hPa
              </p>
            </div>
          </div>

          <p className="text-sm text-gray-500 mt-6 text-center">
            Weather data updates every 3 seconds
          </p>
          <CodeViewer files={codeFiles} />
        </div>
      </div>
    </div>
  );
}

export default WeatherObserverPage;