
import React, { useEffect, useState } from 'react';

interface PriceData {
  symbol: string;
  priceChange: string;
  lastPrice: string;
  bestBid: string;
  bestAsk: string;
}

const PriceWatcher: React.FC<{ symbols: string[] }> = ({ symbols }) => {
  const [priceData, setPriceData] = useState<PriceData[]>([]);

  useEffect(() => {
    const ws = new WebSocket('wss://stream.binance.com:9443/ws');
    
    ws.onopen = () => {
      // Subscribe to symbols
      symbols.forEach((symbol) => {
        ws.send(JSON.stringify({ method: "SUBSCRIBE", params: [`${symbol.toLowerCase()}@ticker`], id: 1 }));
      });
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.e === '24hrTicker') {
        setPriceData((prevData) => {
          const existing = prevData.find(item => item.symbol === data.s);
          if (existing) {
            return prevData.map(item => (item.symbol === data.s ? { ...item, ...data } : item));
          }
          return [...prevData, { symbol: data.s, priceChange: data.p, lastPrice: data.c, bestBid: data.b, bestAsk: data.a }];
        });
      }
    };

    return () => {
      ws.close();
    };
  }, [symbols]);

  return (
    <div>
      <h2>Price Watcher</h2>
      <table>
        <thead>
          <tr>
            <th>Symbol</th>
            <th>Price Change</th>
            <th>Last Price</th>
            <th>Best Bid</th>
            <th>Best Ask</th>
          </tr>
        </thead>
        <tbody>
          {priceData.map((data) => (
            <tr key={data.symbol}>
              <td>{data.symbol}</td>
              <td>{data.priceChange}</td>
              <td>{data.lastPrice}</td>
              <td>{data.bestBid}</td>
              <td>{data.bestAsk}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PriceWatcher;
