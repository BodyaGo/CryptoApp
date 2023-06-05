import axios from 'axios';

const BASE_URL = 'https://api.coingecko.com/api/v3';

export const fetchCoinDetails = async (coinId) => {
  try {
    const response = await axios.get(`${BASE_URL}/coins/${coinId}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchCoinHistory = async (coinId, days) => {
  try {
    const response = await axios.get(`${BASE_URL}/coins/${coinId}/market_chart?vs_currency=usd&days=${days}`);
    return response.data.prices;
  } catch (error) {
    console.error(error);
  }
};
