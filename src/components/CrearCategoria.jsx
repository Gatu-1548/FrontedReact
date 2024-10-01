import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../components/Styles/CrearCategoria.css'; // Asegúrate de importar el nuevo CSS

const CrearCategoria = () => {
  const [nombre, setNombre] = useState('');
  const [categorias, setCategorias] = useState([]);

  // Obtener categorías al cargar el componente
  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/categorias/listar');
        setCategorias(response.data);
      } catch (error) {
        console.error('Error al obtener las categorías', error);
      }
    };

    fetchCategorias();
  }, []);

  const handleCrearCategoria = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/categorias/crear', { nombre });
      alert('Categoría creada: ' + response.data.nombre);
      setCategorias((prevCategorias) => [...prevCategorias, response.data]); // Agregar nueva categoría a la lista
    } catch (error) {
      console.error('Error al crear la categoría', error);
    }
  };

  return (
    <div className="crear-categoria-container">
      <h2 className="crear-categoria-title">Crear Categoría</h2>
      <input 
        type="text" 
        value={nombre} 
        onChange={(e) => setNombre(e.target.value)} 
        placeholder="Nombre de la categoría"
        className="crear-categoria-input"
      />
      <button 
        onClick={handleCrearCategoria}
        className="crear-categoria-button"
      >
        Crear Categoría
      </button>

      {/* Mostrar la lista de categorías */}
      <h3 className="categoria-list-title">Categorías existentes:</h3>
      <ul className="categoria-list">
        {categorias.map((categoria) => (
          <li key={categoria.id} className="categoria-list-item">
            {categoria.nombre}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CrearCategoria;
