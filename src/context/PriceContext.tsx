// src/context/PriceContext.tsx
import React, { createContext, useContext, useState, useEffect } from "react";

// Definindo o tipo do contexto
interface PriceContextType {
  symbols: string[];
  prices: Record<string, number>; // Preço para cada símbolo
  addSymbol: (symbol: string) => void; // Função para adicionar um símbolo
}

// Criando o contexto
const PriceContext = createContext<PriceContextType | undefined>(undefined);

// Provedor do contexto
const PriceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [symbols, setSymbols] = useState<string[]>([]);
  const [prices, setPrices] = useState<Record<string, number>>({});

  const addSymbol = (symbol: string) => {
    setSymbols((prev) => [...prev, symbol]);
  };

  // Lógica para receber dados do WebSocket
  useEffect(() => {
    const ws = new WebSocket("wss://stream.binance.com:9443/ws");

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      // Aqui você deve implementar a lógica para atualizar os preços
      if (data.s && data.p) {
        setPrices((prevPrices) => ({
          ...prevPrices,
          [data.s]: parseFloat(data.p), // Atualiza o preço do símbolo
        }));
      }
    };

    return () => {
      ws.close(); // Fecha a conexão quando o componente é desmontado
    };
  }, []);

  return (
    <PriceContext.Provider value={{ symbols, prices, addSymbol }}>
      {children}
    </PriceContext.Provider>
  );
};

// Hook personalizado para usar o contexto
const usePriceContext = () => {
  const context = useContext(PriceContext);
  if (context === undefined) {
    throw new Error("usePriceContext must be used within a PriceProvider");
  }
  return context;
};

export { PriceProvider, usePriceContext };




