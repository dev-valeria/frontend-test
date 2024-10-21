import React, { createContext, useState, ReactNode, useEffect } from "react";
import useWebSocket from "../hooks/useWebSocket";

interface PriceContextType {
  symbols: string[];
  addSymbol: (symbol: string) => void;
  priceData: any; // Para armazenar os dados do WebSocket
}

export const PriceContext = createContext<PriceContextType | undefined>(
  undefined,
);

export const PriceProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [symbols, setSymbols] = useState<string[]>([]);
  const [priceData, setPriceData] = useState<any[]>([]);

  // Usando useWebSocket no nível do componente
  const url = `wss://data-stream.binance.com/stream?streams=${symbols.join("/")}`;
  const data = useWebSocket(url);

  useEffect(() => {
    if (data) {
      // Atualiza os dados de preço sempre que receber novos dados do WebSocket
      setPriceData((prevData) => [...prevData, data]);
    }
  }, [data]);

  const addSymbol = (symbol: string) => {
    // Adiciona um novo símbolo à lista, se não estiver presente
    if (!symbols.includes(symbol)) {
      setSymbols((prevSymbols) => [...prevSymbols, symbol]);
    }
  };

  return (
    <PriceContext.Provider value={{ symbols, addSymbol, priceData }}>
      {children}
    </PriceContext.Provider>
  );
};


