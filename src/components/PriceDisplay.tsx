
import React, { createContext, useState, ReactNode } from "react";

interface PriceContextType {
  symbols: string[];
  addSymbol: (symbol: string) => void;
}

export const PriceContext = createContext<PriceContextType | undefined>(undefined);

export const PriceProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [symbols, setSymbols] = useState<string[]>([]);

  const addSymbol = (symbol: string) => {
    setSymbols((prevSymbols) => [...prevSymbols, symbol]);
  };

  return (
    <PriceContext.Provider value={{ symbols, addSymbol }}>
      {children}
    </PriceContext.Provider>
  );
};

