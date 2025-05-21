import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CryptidPage from './pages/CryptidPage';
import CryptidDetail from './pages/CryptidDetail';
import './styles/spooky.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CryptidPage />} />
        <Route path="/cryptids/:id" element={<CryptidDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
