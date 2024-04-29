// api.js
import { http } from 'msw';
import { setupWorker } from 'msw/browser'
import  data  from '../data/data.json'

// Mock data storage
localStorage.setItem("data", JSON.stringify(data))
let storedData = JSON.parse(localStorage.getItem('data')) || [];

// Create mock server
const server = setupWorker(
  // GET request handler
  http.get('/', (req, res, ctx) => {
    return res(ctx.json(storedData));
  }),

  // POST request handler
  http.post('/', (req, res, ctx) => {
    const newData = req.body;
    storedData = newData;
    localStorage.setItem('data', JSON.stringify(newData));
    return res(ctx.status(200));
  })
);

// Function to fetch data
export const fetchData = async () => {
  // Simulate an asynchronous API call
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return storedData;
};

// Function to save data
export const saveData = async (data) => {
  // Simulate an asynchronous API call
  await new Promise((resolve) => setTimeout(resolve, 1000));
  storedData = data;
  localStorage.setItem('data', JSON.stringify(data));
};


// Export the mock server
export { server };
