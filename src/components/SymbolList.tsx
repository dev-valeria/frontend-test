import React from "react";
import "./SymbolList.css"; // Importando o CSS

interface SymbolListProps {
  symbols: string[];
}

const SymbolList: React.FC<SymbolListProps> = ({ symbols }) => {
  return (
    <div className="list-container"> {/* Adicionando uma classe para estilização */}
      <h1>Lista de Símbolos</h1>
      {symbols.map((symbol, index) => (
        <div className="symbol-item" key={index}> {/* Usando a classe e a chave */}
          {symbol}
        </div>
      ))}
    </div>
  );
};

export default SymbolList;









