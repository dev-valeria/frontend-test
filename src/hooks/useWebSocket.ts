// Exemplo básico de uso de WebSocket
import { useEffect, useState } from 'react';

const useWebSocket = (url: string) => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const socket = new WebSocket(url);

    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      setData(message);
    };

    return () => {
      socket.close();
    };
  }, [url]);

  return data;
};

export default useWebSocket;

export {};
