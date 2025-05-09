import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import App from './App'; // Optional if used
import HomePage from './pages/HomePage';
import CryptidDetail from './pages/CryptidDetail';
import client from './graphql/apolloClient';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/cryptid/:id" element={<CryptidDetail />} />
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  </StrictMode>
);
