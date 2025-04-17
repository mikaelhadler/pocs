import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import DecoratorPattern from './pages/decorator-pattern/DecoratorPattern';
import ObserverPattern from './pages/observer-pattern/ObserverPattern';
import StrategyPattern from './pages/strategy-pattern/StrategyPattern';
import FactoryPattern from './pages/factory-pattern/FactoryPattern';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/decorator-pattern" element={<DecoratorPattern />} />
        <Route path="/observer-pattern" element={<ObserverPattern />} />
        <Route path="/strategy-pattern" element={<StrategyPattern />} />
        <Route path="/factory-pattern" element={<FactoryPattern />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;