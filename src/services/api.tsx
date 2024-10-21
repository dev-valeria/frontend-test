import { ExchangeInfoResponse } from '../types/PriceData';

export const getExchangeInfo = async (): Promise<ExchangeInfoResponse> => {
  try {
    const response = await fetch("https://api.binance.com/api/v3/exchangeInfo");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data; 
  } catch (error) {
    console.error("Error fetching exchange info:", error);
    throw error; 
  }
};





