// src/components/App.tsx

import React, { useEffect, useState } from "react";
import { PriceProvider } from "../context/PriceContext";
import SymbolList from "./SymbolList";
import { getExchangeInfo } from "../services/api"; // Importa o serviço de API

const App: React.FC = () => {
  const [symbols, setSymbols] = useState<string[]>([]); // Estado para armazenar os símbolos

  useEffect(() => {
    const fetchSymbols = async () => {
      try {
        const data = await getExchangeInfo();
        const symbolList = data.symbols.map((symbol: any) => symbol.symbol); // Extrai os símbolos
        setSymbols(symbolList); // Atualiza o estado com os símbolos
      } catch (error) {
        console.error("Erro ao buscar informações de troca", error);
      }
    };

    fetchSymbols(); // Chama a função para buscar os dados quando o componente é montado
  }, []);

  return (
    <PriceProvider>
      <div>
        <h1>Binance WebSocket Pricing App</h1>
        <SymbolList symbols={symbols} /> {/* Passa os símbolos para o componente */}
      </div>
    </PriceProvider>
  );
};

export default App;

