import { useState } from 'react';
import { Coffee } from '../decorators/Coffee';
import { SimpleCoffee } from '../decorators/SimpleCoffee';
import { MilkDecorator } from '../decorators/MilkDecorator';
import { SugarDecorator } from '../decorators/SugarDecorator';
import { WhippedCreamDecorator } from '../decorators/WhippedCreamDecorator';
import { CoffeeIcon, Milk, Cookie, Cone } from 'lucide-react';
import { BackButton } from '../components/BackButton';

function CoffeeDecorator() {
  const [selections, setSelections] = useState({
    milk: false,
    sugar: false,
    whippedCream: false,
  });

  const createCoffee = (): Coffee => {
    let coffee: Coffee = new SimpleCoffee();

    if (selections.milk) {
      coffee = new MilkDecorator(coffee);
    }
    if (selections.sugar) {
      coffee = new SugarDecorator(coffee);
    }
    if (selections.whippedCream) {
      coffee = new WhippedCreamDecorator(coffee);
    }

    return coffee;
  };

  const coffee = createCoffee();

  const toggleSelection = (key: keyof typeof selections) => {
    setSelections(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 flex flex-col items-left justify-center p-4 gap-4">
      <BackButton color="amber-900" />
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full">

        <div className="flex items-center gap-3 mb-6">
          <CoffeeIcon className="w-8 h-8 text-amber-700" />
          <h1 className="text-2xl font-bold text-amber-900">Coffee Decorator</h1>
        </div>

        <div className="space-y-4 mb-6">
          <button
            onClick={() => toggleSelection('milk')}
            className={`flex items-center gap-3 w-full p-3 rounded-lg border transition-colors ${selections.milk ? 'bg-amber-100 border-amber-300' : 'border-gray-200 hover:bg-gray-50'
              }`}
          >
            <Milk className="w-5 h-5" />
            <span>Add Milk (+$0.50)</span>
          </button>

          <button
            onClick={() => toggleSelection('sugar')}
            className={`flex items-center gap-3 w-full p-3 rounded-lg border transition-colors ${selections.sugar ? 'bg-amber-100 border-amber-300' : 'border-gray-200 hover:bg-gray-50'
              }`}
          >
            <Cookie className="w-5 h-5" />
            <span>Add Sugar (+$0.25)</span>
          </button>

          <button
            onClick={() => toggleSelection('whippedCream')}
            className={`flex items-center gap-3 w-full p-3 rounded-lg border transition-colors ${selections.whippedCream ? 'bg-amber-100 border-amber-300' : 'border-gray-200 hover:bg-gray-50'
              }`}
          >
            <Cone className="w-5 h-5" />
            <span>Add Whipped Cream (+$1.00)</span>
          </button>
        </div>

        <div className="bg-amber-50 rounded-lg p-4">
          <h2 className="font-semibold text-amber-900 mb-2">Your Coffee</h2>
          <p className="text-amber-800">{coffee.getDescription()}</p>
          <p className="text-lg font-bold text-amber-900 mt-2">
            Total: ${coffee.getCost().toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
}

export default CoffeeDecorator;