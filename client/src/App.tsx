import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CryptidPage from './pages/CryptidPage';
import CryptidDetail from './pages/CryptidDetail';
import './App.css';

const App = (): JSX.Element => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CryptidPage />} />
        <Route path="/cryptids/:id" element={<CryptidDetail />} />
      </Routes>
    </Router>
  );
};

export default App;
