import React, { useEffect, useState } from 'react';
import "../components/Styles/Menu.css"

const Menu = () => {
  const [username, setUsername] = useState('');

  useEffect(() => {
    // Aquí asumimos que el nombre de usuario está almacenado en localStorage.
    // Si está en el token JWT, necesitarías decodificar el token.
    const storedUsername = localStorage.getItem('username');
    
    if (storedUsername) {
      setUsername(storedUsername);
    } else {
      // Si el nombre de usuario no está en localStorage, manejar el caso aquí
      setUsername('Usuario');
    }
  }, []);

  return (
    <div className="menu-container">
      <div className="menu-card">
        <h2>Bienvenido, {username}!</h2>
        {/* Aquí va el contenido específico del menú */}
      </div>
    </div>
  );
};

export default Menu;

