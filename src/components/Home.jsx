import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../components/Styles/Home.css'; // Archivo de estilos CSS

const Home = () => {
  const navigate = useNavigate();
  const fullText = "Bienvenido a Style Store, tu tienda de moda preferida para descubrir las últimas tendencias.";
  const [displayedText, setDisplayedText] = useState(''); // Texto mostrado progresivamente

  useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex < fullText.length) {
        setDisplayedText(fullText.substring(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, 50); // Aumentar la velocidad de escritura

    return () => clearInterval(typingInterval);
  }, [fullText]);

  return (
    <div className="home-container">
      <div className="welcome-message">
        <h1>¡Bienvenido a Style Store!</h1>
        <p>{displayedText}</p> {/* Muestra el texto que se escribe progresivamente */}
        <button className="shop-now-button" onClick={() => navigate('/login')}>
          Ver Catálogo
        </button>
      </div>
      <button className="login-button" onClick={() => navigate('/login')}>
        Login
      </button>
    </div>
  );
};

export default Home;