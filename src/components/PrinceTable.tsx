
import React, { useState, useEffect } from 'react';

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

  return (
    <table className="price-table">
      <thead>
        <tr>
          <th>Symbol</th>
          <th>Last Price</th>
          <th>Bid Price</th>
          <th>Ask Price</th>
          <th>Price Change (%)</th>
        </tr>
      </thead>
      <tbody>
        {priceData.map((data) => (
          <tr key={data.symbol}>
            <td>{data.symbol}</td>
            <td>{data.lastPrice}</td>
            <td>{data.bidPrice}</td>
            <td>{data.askPrice}</td>
            <td>{data.priceChangePercent}%</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PriceTable;
