
export interface PriceData {
  s: string; // Símbolo
  c: string; // Preço atual
  p: string; // Mudança percentual
  b: string; // Melhor oferta
  a: string; // Melhor pedido
}

export interface Symbol {
  symbol: string; // Nome do símbolo
  price: string; // Preço atual do símbolo
}

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

export interface ExchangeInfoResponse {
  symbols: SymbolInfo[]; // Array de símbolos
}

