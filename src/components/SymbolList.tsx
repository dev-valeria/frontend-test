import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ExchangeInfoResponse, SymbolInfo } from '../types/PriceData';
import './SymbolList.css'; 
import '@fortawesome/fontawesome-free/css/all.min.css';

interface SymbolListProps {
  onSelectSymbol: (symbol: string) => void;
}

const SymbolList: React.FC<SymbolListProps> = ({ onSelectSymbol }) => {
  const [symbols, setSymbols] = useState<SymbolInfo[]>([]);
  const [search, setSearch] = useState<string>('');
  const [selectedSymbols, setSelectedSymbols] = useState<string[]>([]);

  useEffect(() => {
    const fetchSymbols = async () => {
      const response = await axios.get<ExchangeInfoResponse>('https://api.binance.com/api/v3/exchangeInfo');
      setSymbols(response.data.symbols);
    };

    fetchSymbols();
  }, []);

  const handleSelectSymbol = (symbol: string) => {
    if (selectedSymbols.includes(symbol)) {
      setSelectedSymbols(selectedSymbols.filter((s) => s !== symbol));
    } else {
      setSelectedSymbols([...selectedSymbols, symbol]);
    }
    onSelectSymbol(symbol);
  };

  const filteredSymbols = symbols.filter((symbol) =>
    symbol.symbol.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="table-container">
  {/* Lista de Símbolos */}
  <div className="symbol-list-container">
    <div className="search-container">
      <i className="fas fa-search search-icon"></i>
      <input
        type="text"
        placeholder="Symbol"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
      />
    </div>

        <ul className="symbol-list-items">
          {filteredSymbols.map((symbol) => (
            <li key={symbol.symbol} className="symbol-item">
              <label>
                <input
                  type="checkbox"
                  checked={selectedSymbols.includes(symbol.symbol)}
                  onChange={() => handleSelectSymbol(symbol.symbol)}
                />
                {symbol.symbol}
              </label>
            </li>
          ))}
        </ul>
        <button className="add-button" onClick={() => console.log('Symbols added to list')}>
          Add to List
        </button>
      </div>
    </div>
  );
};

export default SymbolList;



















