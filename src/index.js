import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

 const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

async function enableMocking() {
  if (process.env.NODE_ENV !== 'development') {
    return
  }
 
  const { server } = await import('./services/api')
 
  // `server.start()` returns a Promise that resolves
  // once the Service Worker is up and ready to intercept requests.
  return server.start()
}
 
enableMocking().then(() => {
  root.render(<App />)
})



// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
