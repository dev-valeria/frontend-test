import React, { useState, useEffect } from 'react';
import './PriceTable.css';

interface PriceData {
  symbol: string;
  lastPrice: string;
  bidPrice: string;
  askPrice: string;
  priceChangePercent: string;
}

interface PriceTableProps {
  symbols: string[];
}

const PriceTable: React.FC<PriceTableProps> = ({ symbols }) => {
  const [priceData, setPriceData] = useState<PriceData[]>([]);
  const [lists, setLists] = useState<string[]>(['List A']); // Estado para armazenar as listas
  const [selectedList, setSelectedList] = useState<string>('List A'); // Estado para a lista selecionada

  useEffect(() => {
    const ws = new WebSocket('wss://stream.binance.com:9443/ws/!ticker@arr');

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const filteredData = data.filter((item: any) => symbols.includes(item.s));

      const formattedData = filteredData.map((item: any) => ({
        symbol: item.s,
        lastPrice: item.c,
        bidPrice: item.b,
        askPrice: item.a,
        priceChangePercent: item.P,
      }));

      setPriceData(formattedData);
    };

    return () => {
      ws.close();
    };
  }, [symbols]);

  const handleAddNewList = () => {
    const newListName = `List ${String.fromCharCode(65 + lists.length)}`; 
    setLists([...lists, newListName]);
    setSelectedList(newListName); 
  };

  const handleListChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedList(e.target.value);
  };

  return (
    <div>
      <div className="dropdown-container">
        <select
          id="listDropdown"
          value={selectedList}
          onChange={handleListChange}
          className="list-dropdown"
        >
          {lists.map((list) => (
            <option key={list} value={list}>
              {list}
            </option>
          ))}
        </select>

        {/* Botão do lado direito */}
        <button className="add-list-button" onClick={handleAddNewList}>
          +
        </button>
      </div>

      {/* Tabela de Preços */}
      <table className="price-table">
        <thead>
          <tr>
            <th>SYMBOL</th>
            <th>LAST PRICE</th>
            <th>BID PRICE</th>
            <th>ASK PRICE</th>
            <th>PRICE CHANGE (%)</th>
          </tr>
        </thead>
        <tbody>
          {priceData.map((data) => (
            <tr key={data.symbol}>
              <td>{data.symbol}</td>
              <td>{parseFloat(data.lastPrice).toFixed(5)}</td>
              <td>{parseFloat(data.bidPrice).toFixed(5)}</td>
              <td>{parseFloat(data.askPrice).toFixed(5)}</td>
              <td>
                <span
                  className={
                    parseFloat(data.priceChangePercent) > 0
                      ? 'positive-change'
                      : 'negative-change'
                  }
                >
                  {(parseFloat(data.priceChangePercent) * 100).toFixed(3)}%
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PriceTable;

