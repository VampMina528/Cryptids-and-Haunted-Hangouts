import { useState } from 'react';

const CodenameForm = () => {
  const [codename, setCodename] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (codename.trim()) {
      localStorage.setItem('cryptidCodename', codename.trim());
      alert(`Welcome, Agent ${codename}!`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="codename-form">
      <label htmlFor="codename">Enter Your Codename:</label>
      <input
        id="codename"
        type="text"
        value={codename}
        onChange={(e) => setCodename(e.target.value)}
        placeholder="e.g., NightOwl"
        required
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default CodenameForm;

