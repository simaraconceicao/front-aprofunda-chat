import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import Home from './pages/Home';
import CriarDespesas from './pages//CriarDespesas';
import Dashboard2 from './pages/Dashboard2';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './services/firebase';

const App = () => {
  const [user] = useAuthState(auth);
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/criar-despesas" element={ user ? <CriarDespesas  /> : <Home />} />
        <Route path="/dashboard" element={user ? <Dashboard2 /> : <Home />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};
export default App;
