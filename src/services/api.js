import axios from 'axios';

const API_URL = 'https://ai.stevensumpter.com';
const API_KEY = 'sk-889a124bef72483cb4c0fb10ba126779';

const client = axios.create({
  baseURL: API_URL,
  headers: {
    'Authorization': `Bearer ${API_KEY}`,
    'Content-Type': 'application/json'
  }
});

export const fetchModels = async () => {
  try {
    console.log('Fetching models from:', `${API_URL}/api/models`);
    const response = await client.get('/api/models');
    console.log('Models response:', response.data);
    
    // Ensure we return an array of model objects
    if (Array.isArray(response.data)) {
      return response.data;
    } else if (response.data && typeof response.data === 'object') {
      // If the response is an object with a data property
      return response.data.data || [];
    }
    
    console.warn('Unexpected models response format:', response.data);
    return [];
  } catch (error) {
    console.error('Error fetching models:', error.response || error);
    return [];
  }
};

export const sendMessage = async (model, messages) => {
  try {
    const response = await client.post('/api/chat/completions', {
      model,
      messages,
      temperature: 0.7,
      max_tokens: 1000
    });
    
    if (response.data?.choices?.[0]?.message) {
      return response.data.choices[0].message;
    }
    throw new Error('Invalid response format');
  } catch (error) {
    console.error('Error in chat:', error.response || error);
    throw error;
  }
};

export default client;