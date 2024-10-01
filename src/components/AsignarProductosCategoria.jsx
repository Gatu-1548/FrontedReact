import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const AsignarProductosACategoria = () => {
  const [categorias, setCategorias] = useState([]);
  const [productos, setProductos] = useState([]);
  const [selectedCategoria, setSelectedCategoria] = useState('');
  const [selectedProductos, setSelectedProductos] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        // Obtener el token almacenado en localStorage
        const token = localStorage.getItem('token');

        // Realizar la solicitud con el token en las cabeceras
        const response = await axios.get('https://backendspring.onrender.com/api/categorias/listar', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (Array.isArray(response.data)) {
          setCategorias(response.data);
        } else {
          throw new Error('La respuesta de categorías no es válida');
        }
      } catch (error) {
        setError('Error al obtener categorías');
        console.error(error);
      }
    };

    const fetchProductos = async () => {
      try {
        // Obtener el token almacenado en localStorage
        const token = localStorage.getItem('token');

        // Realizar la solicitud con el token en las cabeceras
        const response = await axios.get('https://backendspring.onrender.com/api/productos', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (Array.isArray(response.data)) {
          setProductos(response.data);
        } else {
          throw new Error('La respuesta de productos no es válida');
        }
      } catch (error) {
        setError('Error al obtener productos');
        console.error(error);
      }
    };

    fetchCategorias();
    fetchProductos();
  }, []);

  const handleAsignar = async () => {
    if (!selectedCategoria || selectedProductos.length === 0) {
      Swal.fire('Error', 'Debe seleccionar una categoría y al menos un producto.', 'error');
      return;
    }

    try {
      // Obtener el token almacenado en localStorage
      const token = localStorage.getItem('token');

      // Realizar la solicitud con el token en las cabeceras
      await axios.post(
        `https://backendspring.onrender.com/api/categorias/${selectedCategoria}/asignar-productos`,
        selectedProductos,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Añadir la cabecera de autorización con el token
          },
        }
      );

      Swal.fire('Asignación exitosa', 'Los productos han sido asignados a la categoría correctamente.', 'success');
    } catch (error) {
      console.error('Error al asignar productos', error);
      Swal.fire('Error', 'Hubo un error al asignar los productos a la categoría.', 'error');
    }
  };

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="asignar-productos-container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <h2>Asignar Productos a Categoría</h2>

      {/* Selector de Categoría */}
      <div className="categoria-selector" style={{ marginBottom: '20px' }}>
        <label>Seleccionar Categoría</label>
        <select
          value={selectedCategoria}
          onChange={(e) => setSelectedCategoria(e.target.value)}
          style={{ marginLeft: '10px', padding: '5px', borderRadius: '5px' }}
        >
          <option value="">Seleccionar Categoría</option>
          {Array.isArray(categorias) && categorias.map((categoria) => (
            <option key={categoria.id} value={categoria.id}>
              {categoria.nombre}
            </option>
          ))}
        </select>
      </div>

      {/* Lista de Productos en tarjetas */}
      <div className="productos-grid" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
        gap: '20px',
      }}>
        {productos.length === 0 ? (
          <p>No hay productos disponibles</p>
        ) : (
          productos.map((producto) => (
            <div key={producto.id} className="producto-card" style={{
              border: '1px solid #ccc',
              borderRadius: '10px',
              padding: '20px',
              backgroundColor: '#fff',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}>
              <img
                src={`https://backendspring.onrender.com/api/productos/imagen/${producto.imagenUrl.split('/').pop()}`}
                alt={producto.nombre}
                className="producto-imagen"
                style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '10px' }}
              />
              <div className="producto-detalles" style={{ flexGrow: 1, textAlign: 'center', marginTop: '10px' }}>
                <h3 style={{ marginBottom: '10px', fontSize: '18px', fontWeight: 'bold' }}>{producto.nombre}</h3>
                <p style={{ fontSize: '14px', color: '#555' }}>{producto.descripcion}</p>
                <p style={{ fontWeight: 'bold', marginTop: '10px' }}>Precio: ${producto.precio}</p>
              </div>
              <div className="producto-checkbox" style={{ marginTop: '10px' }}>
                <input
                  type="checkbox"
                  value={producto.id}
                  onChange={(e) => {
                    const selected = e.target.checked;
                    setSelectedProductos((prev) =>
                      selected
                        ? [...prev, producto.id]
                        : prev.filter((id) => id !== producto.id)
                    );
                  }}
                  style={{ marginRight: '10px' }}
                />
                <label>Seleccionar</label>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Botón de Asignar */}
      <button
        className="asignar-button"
        onClick={handleAsignar}
        style={{
          backgroundColor: '#61b469',
          color: '#fff',
          padding: '10px 20px',
          border: 'none',
          borderRadius: '5px',
          fontSize: '16px',
          cursor: 'pointer',
          marginTop: '20px',
          width: '100%',
        }}
      >
        Asignar a Categoría
      </button>
    </div>
  );
};

export default AsignarProductosACategoria;