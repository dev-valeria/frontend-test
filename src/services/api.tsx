import axios from 'axios';

// Função para buscar as informações de troca da Binance
export const getExchangeInfo = async () => {
  try {
    const response = await axios.get('https://api.binance.com/api/v3/exchangeInfo');
    return response.data;  // Retorna os dados da API
  } catch (error) {
    console.error("Erro ao buscar informações de troca:", error);
    throw error;  // Propaga o erro para ser tratado pelo chamador
  }
};
