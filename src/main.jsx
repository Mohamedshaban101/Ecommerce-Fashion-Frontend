import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './assets/css/style.scss';
import AdminAuthContextProvider from './components/context/AdminAuth.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import CartContextProvider from './components/context/Cart'
import CheckFlowProvider from './components/context/CheckFlow'
const queryClient = new QueryClient();
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <AdminAuthContextProvider>
        <CartContextProvider>
          <CheckFlowProvider>
            <App />
          </CheckFlowProvider>
        </CartContextProvider>
      </AdminAuthContextProvider>
    </QueryClientProvider>
  </BrowserRouter>
)
