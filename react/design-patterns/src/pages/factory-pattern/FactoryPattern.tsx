import React, { useState } from 'react';
import { Car, Truck, Factory, Settings2 } from 'lucide-react';
import { VehicleFactory, Vehicle } from './factory/VehicleFactory';
import { BackButton } from '../../components/BackButton';

type VehicleType = 'car' | 'motorcycle' | 'truck';

interface VehicleFormData {
  type: VehicleType;
  make: string;
  model: string;
  year: number;
  color: string;
  engineType?: string;
  transmission?: string;
  engineCC?: number;
  bikeType?: string;
  bedLength?: string;
  towingCapacity?: string;
}

function FactoryPattern() {
  const [formData, setFormData] = useState<VehicleFormData>({
    type: 'car',
    make: '',
    model: '',
    year: new Date().getFullYear(),
    color: '#000000',
    engineType: 'V6',
    transmission: 'Automatic'
  });

  const [createdVehicle, setCreatedVehicle] = useState<Vehicle | null>(null);
  const [error, setError] = useState<string>('');

  const vehicleTypes = [
    { type: 'car', icon: Car, label: 'Car' },
    { type: 'motorcycle', icon: Factory, label: 'Motorcycle' },
    { type: 'truck', icon: Truck, label: 'Truck' }
  ];

  const getTypeSpecificFields = () => {
    switch (formData.type) {
      case 'car':
        return (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Engine Type
                </label>
                <select
                  className="w-full bg-gray-700 text-gray-200 rounded-lg p-2 border border-gray-600"
                  value={formData.engineType}
                  onChange={(e) => setFormData({ ...formData, engineType: e.target.value })}
                >
                  <option value="I4">Inline 4</option>
                  <option value="V6">V6</option>
                  <option value="V8">V8</option>
                  <option value="Electric">Electric</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Transmission
                </label>
                <select
                  className="w-full bg-gray-700 text-gray-200 rounded-lg p-2 border border-gray-600"
                  value={formData.transmission}
                  onChange={(e) => setFormData({ ...formData, transmission: e.target.value })}
                >
                  <option value="Manual">Manual</option>
                  <option value="Automatic">Automatic</option>
                  <option value="CVT">CVT</option>
                </select>
              </div>
            </div>
          </>
        );
      case 'motorcycle':
        return (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Engine CC
                </label>
                <input
                  type="number"
                  className="w-full bg-gray-700 text-gray-200 rounded-lg p-2 border border-gray-600"
                  value={formData.engineCC || 600}
                  onChange={(e) => setFormData({ ...formData, engineCC: Number(e.target.value) })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Bike Type
                </label>
                <select
                  className="w-full bg-gray-700 text-gray-200 rounded-lg p-2 border border-gray-600"
                  value={formData.bikeType}
                  onChange={(e) => setFormData({ ...formData, bikeType: e.target.value })}
                >
                  <option value="Sport">Sport</option>
                  <option value="Cruiser">Cruiser</option>
                  <option value="Touring">Touring</option>
                  <option value="Adventure">Adventure</option>
                </select>
              </div>
            </div>
          </>
        );
      case 'truck':
        return (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Bed Length
                </label>
                <select
                  className="w-full bg-gray-700 text-gray-200 rounded-lg p-2 border border-gray-600"
                  value={formData.bedLength}
                  onChange={(e) => setFormData({ ...formData, bedLength: e.target.value })}
                >
                  <option value="5.5 ft">5.5 ft</option>
                  <option value="6.5 ft">6.5 ft</option>
                  <option value="8.0 ft">8.0 ft</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Towing Capacity
                </label>
                <select
                  className="w-full bg-gray-700 text-gray-200 rounded-lg p-2 border border-gray-600"
                  value={formData.towingCapacity}
                  onChange={(e) => setFormData({ ...formData, towingCapacity: e.target.value })}
                >
                  <option value="7,500 lbs">7,500 lbs</option>
                  <option value="10,000 lbs">10,000 lbs</option>
                  <option value="12,000 lbs">12,000 lbs</option>
                </select>
              </div>
            </div>
          </>
        );
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      const vehicle = VehicleFactory.createVehicle(formData);
      setCreatedVehicle(vehicle);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  const handleTypeChange = (type: VehicleType) => {
    const baseData = {
      type,
      make: formData.make,
      model: formData.model,
      year: formData.year,
      color: formData.color
    };

    let specificData = {};
    switch (type) {
      case 'car':
        specificData = {
          engineType: 'V6',
          transmission: 'Automatic'
        };
        break;
      case 'motorcycle':
        specificData = {
          engineCC: 600,
          bikeType: 'Sport'
        };
        break;
      case 'truck':
        specificData = {
          bedLength: '6.5 ft',
          towingCapacity: '10,000 lbs'
        };
        break;
    }

    setFormData({ ...baseData, ...specificData });
    setCreatedVehicle(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex flex-col justify-center p-4 gap-4">
      <BackButton color="gray-100" />
      <div className="bg-gray-800 rounded-xl shadow-2xl p-8 max-w-4xl w-full border border-gray-700">
        <div className="flex items-center gap-3 mb-8">
          <Settings2 className="w-8 h-8 text-blue-400" />
          <h1 className="text-3xl font-bold text-gray-100">Vehicle Factory</h1>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="grid grid-cols-3 gap-4 mb-6">
              {vehicleTypes.map(({ type, icon: Icon, label }) => (
                <button
                  key={type}
                  onClick={() => handleTypeChange(type as VehicleType)}
                  className={`p-4 rounded-lg border transition-all ${
                    formData.type === type
                      ? 'bg-blue-500/20 border-blue-500'
                      : 'border-gray-700 hover:border-gray-600'
                  }`}
                >
                  <div className="flex flex-col items-center gap-2">
                    <Icon className="w-6 h-6 text-blue-400" />
                    <span className="text-gray-300 text-sm">{label}</span>
                  </div>
                </button>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Make
                  </label>
                  <input
                    type="text"
                    className="w-full bg-gray-700 text-gray-200 rounded-lg p-2 border border-gray-600"
                    value={formData.make}
                    onChange={(e) => setFormData({ ...formData, make: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Model
                  </label>
                  <input
                    type="text"
                    className="w-full bg-gray-700 text-gray-200 rounded-lg p-2 border border-gray-600"
                    value={formData.model}
                    onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Year
                  </label>
                  <input
                    type="number"
                    className="w-full bg-gray-700 text-gray-200 rounded-lg p-2 border border-gray-600"
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: Number(e.target.value) })}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Color
                  </label>
                  <input
                    type="color"
                    className="w-full h-10 bg-gray-700 rounded-lg p-1 border border-gray-600"
                    value={formData.color}
                    onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                  />
                </div>
              </div>

              {getTypeSpecificFields()}

              <button
                type="submit"
                className="w-full py-3 px-6 rounded-lg font-semibold bg-blue-600 hover:bg-blue-700 text-white transition-colors"
              >
                Create Vehicle
              </button>

              {error && (
                <p className="text-red-400 text-sm mt-2">{error}</p>
              )}
            </form>
          </div>

          {createdVehicle && (
            <div className="bg-gray-900 rounded-xl p-6 border border-gray-700">
              <div className="text-center mb-6">
                <div className="text-6xl mb-4">{createdVehicle.getSpecs().icon}</div>
                <h2 className="text-xl font-bold text-gray-200">
                  {createdVehicle.year} {createdVehicle.make} {createdVehicle.model}
                </h2>
                <div
                  className="w-8 h-8 rounded-full mx-auto mt-2 border-2 border-gray-600"
                  style={{ backgroundColor: createdVehicle.color }}
                />
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-300 mb-2">Specifications</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {Object.entries(createdVehicle.getSpecs().specs).map(([key, value]) => (
                      <div key={key} className="bg-gray-800 rounded-lg p-3">
                        <div className="text-sm text-gray-400">{key}</div>
                        <div className="text-gray-200">{value}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-300 mb-2">Features</h3>
                  <ul className="grid grid-cols-2 gap-2">
                    {createdVehicle.getSpecs().features.map((feature, index) => (
                      <li key={index} className="text-gray-400 text-sm flex items-center gap-2">
                        <span className="text-blue-400">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default FactoryPattern;