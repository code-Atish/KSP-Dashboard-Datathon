import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { Toaster } from 'react-hot-toast';
import { inject } from '@vercel/analytics';

 
inject();
ReactDOM.createRoot(document.getElementById('root')).render(
<React.StrictMode>
<Toaster
    position="top-center"
    reverseOrder={true}
  />
  <App />
</React.StrictMode>
)
