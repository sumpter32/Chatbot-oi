import axios from 'axios';
import readlineSync from 'readline-sync';
import dotenv from 'dotenv';

dotenv.config();

const API_URL = process.env.API_URL;
const API_KEY = process.env.API_KEY;

const client = axios.create({
  baseURL: API_URL,
  headers: {
    'Authorization': `Bearer ${API_KEY}`,
    'Content-Type': 'application/json'
  }
});

async function getAvailableModels() {
  try {
    const response = await client.get('/api/models');
    return response.data;
  } catch (error) {
    console.error('Error fetching models:', error.message);
    return [];
  }
}

async function chat(model, messages) {
  try {
    const response = await client.post('/api/chat/completions', {
      model,
      messages
    });
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Error in chat:', error.message);
    return 'Sorry, I encountered an error processing your request.';
  }
}

async function main() {
  console.log('Fetching available models...');
  const models = await getAvailableModels();
  
  if (models.length === 0) {
    console.log('No models available. Please check your API configuration.');
    return;
  }

  console.log('\nAvailable models:');
  models.forEach((model, index) => {
    console.log(`${index + 1}. ${model.id}`);
  });

  const modelIndex = readlineSync.questionInt('Select a model (enter number): ', {
    min: 1,
    max: models.length
  }) - 1;

  const selectedModel = models[modelIndex].id;
  console.log(`\nUsing model: ${selectedModel}`);
  console.log('\nChat started (type "exit" to quit)');

  const messages = [];
  
  while (true) {
    const userInput = readlineSync.question('\nYou: ');
    
    if (userInput.toLowerCase() === 'exit') {
      break;
    }

    messages.push({ role: 'user', content: userInput });
    
    const response = await chat(selectedModel, messages);
    messages.push({ role: 'assistant', content: response });
    
    console.log('\nAssistant:', response);
  }

  console.log('\nChat ended. Goodbye!');
}

main().catch(console.error);