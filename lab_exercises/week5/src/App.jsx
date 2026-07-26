import React, { useState } from 'react';
import IndexPage from './pages/IndexPage';
import HomePage from './pages/HomePage';
import PortfolioPage from './pages/PortfolioPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [authMode, setAuthMode] = useState(null);
  const [selectedProductParam, setSelectedProductParam] = useState(null);
  const [selectedCreatorParam, setSelectedCreatorParam] = useState(null);
  const [currentUser, setCurrentUser] = useState(null); // Logged in user from SQLite

  const handleNavigate = (page, param = null) => {
    setCurrentPage(page);
    if (page === 'portfolio' && param && typeof param === 'object') {
      setSelectedCreatorParam(param);
      setSelectedProductParam(null);
      setAuthMode(null);
    } else if (typeof param === 'string') {
      setAuthMode(param);
      setSelectedProductParam(null);
      setSelectedCreatorParam(null);
    } else if (param && typeof param === 'object') {
      setSelectedProductParam(param);
      setSelectedCreatorParam(null);
      setAuthMode(null);
    } else {
      setAuthMode(null);
      setSelectedProductParam(null);
      setSelectedCreatorParam(null);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-cream">
      {currentPage === 'index' && <IndexPage onNavigate={handleNavigate} currentUser={currentUser} setCurrentUser={setCurrentUser} />}
      {currentPage === 'home' && <HomePage onNavigate={handleNavigate} initialAuthMode={authMode} initialProduct={selectedProductParam} currentUser={currentUser} setCurrentUser={setCurrentUser} />}
      {currentPage === 'portfolio' && <PortfolioPage onNavigate={handleNavigate} selectedCreator={selectedCreatorParam} currentUser={currentUser} setCurrentUser={setCurrentUser} />}
    </div>
  );
}
