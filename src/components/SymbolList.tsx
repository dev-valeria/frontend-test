// src/components/SymbolList.tsx

import React from "react";

interface SymbolListProps {
  symbols: string[]; // Defina a propriedade 'symbols' como um array de strings
}

const SymbolList: React.FC<SymbolListProps> = ({ symbols }) => {
  return (
    <div>
      <h2>Lista de Símbolos</h2>
      <ul>
        {symbols.map((symbol, index) => (
          <li key={index}>{symbol}</li> // Use um índice ou um ID exclusivo como chave
        ))}
      </ul>
    </div>
  );
};

export default SymbolList;








