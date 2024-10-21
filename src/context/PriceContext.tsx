import React, { createContext, useContext, useState, useEffect } from "react";

interface PriceContextType {
  symbols: string[];
  prices: Record<string, number>; 
  addSymbol: (symbol: string) => void; 
}

const PriceContext = createContext<PriceContextType | undefined>(undefined);

const PriceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [symbols, setSymbols] = useState<string[]>([]);
  const [prices, setPrices] = useState<Record<string, number>>({});

  const addSymbol = (symbol: string) => {
    setSymbols((prev) => [...prev, symbol]);
  };

  useEffect(() => {
    const ws = new WebSocket("wss://stream.binance.com:9443/ws");

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.s && data.p) {
        setPrices((prevPrices) => ({
          ...prevPrices,
          [data.s]: parseFloat(data.p), 
        }));
      }
    };

    return () => {
      ws.close(); 
    };
  }, []);

  return (
    <PriceContext.Provider value={{ symbols, prices, addSymbol }}>
      {children}
    </PriceContext.Provider>
  );
};

const usePriceContext = () => {
  const context = useContext(PriceContext);
  if (context === undefined) {
    throw new Error("usePriceContext must be used within a PriceProvider");
  }
  return context;
};

export { PriceProvider, usePriceContext };




