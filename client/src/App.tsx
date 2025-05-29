import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { createContext, useState } from "react";
import CryptidPage from "./pages/CryptidPage";
import CryptidDetail from "./pages/CryptidDetail";
import HauntedPage from "./pages/HauntedPage";
import Header from "./components/Header";
import MusicPlayer from "./components/MusicPlayer"; // <- You will create this file
import "./styles/spooky.css";

export const CryptidContext = createContext<{
  selectCryptid: (id: string) => void;
} | null>(null);

function App() {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  return (
    <CryptidContext.Provider value={{ selectCryptid: setSelectedId }}>
      <Router>
        <Header />
        <MusicPlayer /> {/* Always visible on all pages */}
        <Routes>
          <Route path="/" element={<CryptidPage selectedId={selectedId} />} />
          <Route path="/cryptids/:id" element={<CryptidDetail />} />
          <Route path="/haunted/:id" element={<HauntedPage />} />
        </Routes>
      </Router>
    </CryptidContext.Provider>
  );
}

export default App;
