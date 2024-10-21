// src/types.ts

// Interface para os dados de preço
export interface PriceData {
  s: string; // Símbolo
  c: string; // Preço atual
  p: string; // Mudança percentual
  b: string; // Melhor oferta
  a: string; // Melhor pedido
}

// Interface para o símbolo
export interface Symbol {
  symbol: string; // Nome do símbolo
  price: string; // Preço atual do símbolo
}

// Interface para as informações do símbolo, retornadas pela API da Binance
export interface SymbolInfo {
  symbol: string;      // Símbolo
  priceChange: string; // Mudança de preço
  priceChangePercent: string; // Mudança percentual de preço
  weightedAvgPrice: string; // Preço médio ponderado
  lastPrice: string;   // Último preço
  bestBid: string;     // Melhor oferta
  bestAsk: string;     // Melhor pedido
  openPrice: string;   // Preço de abertura
  highPrice: string;   // Preço alto
  lowPrice: string;    // Preço baixo
  volume: string;      // Volume total negociado
}

// Interface para a resposta da API da Binance
export interface ExchangeInfoResponse {
  symbols: SymbolInfo[]; // Array de símbolos
}

