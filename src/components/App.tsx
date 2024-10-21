import React, { useState } from 'react';
import SymbolList from '../components/SymbolList';
import PriceTable from '../components/PrinceTable'; 

const App: React.FC = () => {
  const [selectedSymbols, setSelectedSymbols] = useState<string[]>([]);

  const handleSelectSymbol = (symbol: string) => {
    setSelectedSymbols((prevSymbols) =>
      prevSymbols.includes(symbol)
        ? prevSymbols.filter((s) => s !== symbol)
        : [...prevSymbols, symbol]
    );
  };

  return (
    <div className="app">
      <div className="table-container">
        <div className="symbol-list-container">
          <SymbolList onSelectSymbol={handleSelectSymbol} />
        </div>
        <div className="price-table-container">
          <PriceTable symbols={selectedSymbols} />
        </div>
      </div>
    </div>
  );
};

export default App;












