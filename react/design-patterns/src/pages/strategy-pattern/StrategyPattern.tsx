import { useState } from 'react';
import { Sword, Wand2, Target, Shield, RefreshCw } from 'lucide-react';
import {
  Character,
  SwordAttackStrategy,
  MagicAttackStrategy,
  ArcherAttackStrategy
} from './strategies/AttackStrategy';
import { BackButton } from '../../components/BackButton';

function StrategyPattern() {
  const [character] = useState(() => new Character(new SwordAttackStrategy()));
  const [currentStrategy, setCurrentStrategy] = useState('sword');
  const [attackResult, setAttackResult] = useState<{
    damage: number;
    description: string;
    animation: string;
  } | null>(null);
  const [enemyHealth, setEnemyHealth] = useState(100);
  const [isAttacking, setIsAttacking] = useState(false);
  const [combo, setCombo] = useState(0);

  const strategies = {
    sword: { name: 'Sword', icon: Sword, color: 'red' },
    magic: { name: 'Magic', icon: Wand2, color: 'purple' },
    archer: { name: 'Archer', icon: Target, color: 'green' }
  };

  const changeStrategy = (strategyName: string) => {
    const strategyMap = {
      sword: new SwordAttackStrategy(),
      magic: new MagicAttackStrategy(),
      archer: new ArcherAttackStrategy()
    };
    
    character.setStrategy(strategyMap[strategyName as keyof typeof strategyMap]);
    setCurrentStrategy(strategyName);
  };

  const performAttack = () => {
    if (isAttacking || enemyHealth <= 0) return;
    
    setIsAttacking(true);
    const result = character.attack();
    setAttackResult(result);
    setCombo(prev => prev + 1);
    
    setEnemyHealth(prev => Math.max(0, prev - result.damage));

    setTimeout(() => {
      setIsAttacking(false);
      setAttackResult(null);
    }, 1000);
  };

  const resetBattle = () => {
    setEnemyHealth(100);
    setCombo(0);
    setAttackResult(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex flex-col items-left justify-center gap-4  p-4">
      <BackButton color="gray-100" />
      <div className="bg-gray-800 rounded-xl shadow-2xl p-8 max-w-md w-full border border-gray-700">
        <h1 className="text-3xl font-bold text-gray-100 mb-6 text-center">
          Battle Simulator
        </h1>

        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-300">Enemy Health</span>
            <span className="text-gray-300">{enemyHealth}/100</span>
          </div>
          <div className="w-full h-4 bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-red-500 transition-all duration-300"
              style={{ width: `${enemyHealth}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-8">
          {Object.entries(strategies).map(([key, { name, icon: Icon, color }]) => (
            <button
              key={key}
              onClick={() => changeStrategy(key)}
              className={`p-4 rounded-lg border transition-all ${
                currentStrategy === key
                  ? `bg-${color}-500/20 border-${color}-500`
                  : 'border-gray-700 hover:border-gray-600'
              }`}
            >
              <div className="flex flex-col items-center gap-2">
                <Icon className={`w-6 h-6 text-${color}-500`} />
                <span className="text-gray-300 text-sm">{name}</span>
              </div>
            </button>
          ))}
        </div>

        <div className="text-center mb-8">
          {attackResult && (
            <div className="animate-bounce text-4xl mb-2">
              {attackResult.animation}
            </div>
          )}
          <div className="h-6">
            {attackResult && (
              <p className="text-gray-300">
                {attackResult.description} for{' '}
                <span className="text-red-500 font-bold">
                  {attackResult.damage}
                </span>{' '}
                damage!
              </p>
            )}
          </div>
        </div>

        <div className="flex gap-4">
          <button
            onClick={performAttack}
            disabled={isAttacking || enemyHealth <= 0}
            className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all ${
              isAttacking || enemyHealth <= 0
                ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            Attack
          </button>
          <button
            onClick={resetBattle}
            className="py-3 px-4 rounded-lg bg-gray-700 hover:bg-gray-600 transition-all"
          >
            <RefreshCw className="w-5 h-5 text-gray-300" />
          </button>
        </div>

        <div className="mt-4 flex justify-between items-center text-gray-400 text-sm">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4" />
            <span>Combo: {combo}</span>
          </div>
          {enemyHealth <= 0 && (
            <span className="text-green-500">Victory!</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default StrategyPattern;