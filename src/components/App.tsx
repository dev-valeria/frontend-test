import React from 'react';
import { PriceProvider } from '../context/PriceContext';
import SymbolList from './SymbolList';

const App: React.FC = () => {
  return (
    <PriceProvider>
      <div>
        <h1>Binance WebSocket Pricing App</h1>
        <SymbolList />
      </div>
    </PriceProvider>
  );
};

export default App;

