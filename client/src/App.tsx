import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { createContext, useState } from 'react';
import ProtectedRoute from './components/ProtectedRoute';
import CryptidPage from './pages/CryptidPage';
import CryptidDetail from './pages/CryptidDetail';
import HauntedPage from './pages/HauntedPage';
import ForumsPage from './pages/ForumsPage';
import Header from './components/Header';
import MusicPlayer from './components/MusicPlayer';
import './styles/spooky.css';


export const CryptidContext = createContext<{
  selectCryptid: (id: string) => void;
} | null>(null);

function AppRoutes() {
  const location = useLocation();
  const hideHeader = location.pathname.startsWith("/cryptids") || location.pathname.startsWith("/haunted");


  return (
    <>
      {!hideHeader && <Header />}
      <MusicPlayer />
      <Routes>
        <Route path="/" element={<CryptidPage />} />
        <Route path="/cryptids/:id" element={<CryptidDetail />} />
        <Route path="/haunted/:id" element={<HauntedPage />} />
        <Route path="/forums" element={
          <ProtectedRoute>
            <ForumsPage />
          </ProtectedRoute>
        } />
      </Routes>
    </>
  );
}

function App() {
  const [selectedId, setSelectedId] = useState<string | null>(null); //do we still need this?

  return (
    <CryptidContext.Provider value={{ selectCryptid: setSelectedId }}>
      <Router>
        <AppRoutes />
      </Router>
    // </CryptidContext.Provider>
  )
}

export default App;