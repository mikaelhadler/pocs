import React from 'react';
import { Link } from 'react-router-dom';
import { Coffee, CloudSun, Code } from 'lucide-react';

interface PatternCard {
  title: string;
  description: string;
  icon: React.ReactNode;
  path: string;
  gradient: string;
}

const patterns: PatternCard[] = [
  {
    title: 'Coffee Decorator',
    description: 'Customize your coffee with various add-ons using the Decorator pattern',
    icon: <Coffee className="w-8 h-8" />,
    path: '/coffee-decorator',
    gradient: 'from-amber-50 to-orange-100'
  },
  {
    title: 'Weather Observer',
    description: 'Monitor weather conditions in real-time using the Observer pattern',
    icon: <CloudSun className="w-8 h-8" />,
    path: '/weather-observer',
    gradient: 'from-blue-50 to-cyan-100'
  }
];

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Code className="w-10 h-10 text-indigo-600" />
            <h1 className="text-4xl font-bold text-gray-900">Design Patterns</h1>
          </div>
          <p className="text-lg text-gray-600">
            Interactive examples of common design patterns in TypeScript
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {patterns.map((pattern) => (
            <Link
              key={pattern.path}
              to={pattern.path}
              className="block group"
            >
              <div className={`bg-gradient-to-r ${pattern.gradient} rounded-xl shadow-lg p-6 
                transition-transform duration-300 group-hover:transform group-hover:-translate-y-1`}>
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-gray-700">
                    {pattern.icon}
                  </div>
                  <h2 className="text-2xl font-semibold text-gray-900">
                    {pattern.title}
                  </h2>
                </div>
                <p className="text-gray-600">
                  {pattern.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;