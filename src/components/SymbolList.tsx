import React, { useContext } from "react";
import { PriceContext } from "../context/PriceContext";

const SymbolList: React.FC = () => {
  const priceContext = useContext(PriceContext);

  if (!priceContext) return null;

  const { symbols, addSymbol } = priceContext;

  return (
    <div>
      <h2>Lista de Símbolos</h2>
      <button onClick={() => addSymbol("ETHBTC")}>Adicionar ETHBTC</button>
      <button onClick={() => addSymbol("BNBBTC")}>Adicionar BNBBTC</button>
      <ul>
        {symbols.map((symbol) => (
          <li key={symbol}>{symbol}</li>
        ))}
      </ul>
    </div>
  );
};

export default SymbolList;
