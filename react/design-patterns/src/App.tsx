import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CoffeeDecorator from './pages/CoffeeDecorator';
import WeatherObserver from './pages/WeatherObserver';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/coffee-decorator" element={<CoffeeDecorator />} />
        <Route path="/weather-observer" element={<WeatherObserver />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;