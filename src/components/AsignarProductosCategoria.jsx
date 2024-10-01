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
        const response = await axios.get('https://backendspring.onrender.com/api/categorias/listar');
        if (Array.isArray(response.data)) {
          setCategorias(response.data);
        } else {
          throw new Error('La respuesta de categorías no es válida');
        }
      } catch (error) {
        setError('Error al obtener categorías');
      }
    };

    const fetchProductos = async () => {
      try {
        const response = await axios.get('https://backendspring.onrender.com/api/productos');
        if (Array.isArray(response.data)) {
          setProductos(response.data);
        } else {
          throw new Error('La respuesta de productos no es válida');
        }
      } catch (error) {
        setError('Error al obtener productos');
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
      await axios.post(`https://backendspring.onrender.com/api/categorias/${selectedCategoria}/asignar-productos`, selectedProductos);
      Swal.fire('Asignación exitosa', 'Los productos han sido asignados a la categoría correctamente.', 'success');
    } catch (error) {
      Swal.fire('Error', 'Hubo un error al asignar los productos a la categoría.', 'error');
    }
  };

  if (error) {
    return <div style={styles.errorMessage}>{error}</div>;
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Asignar Productos a Categoría</h2>

      {/* Selector de Categoría */}
      <div style={styles.formContainer}>
        <label style={styles.label}>Seleccionar Categoría</label>
        <select
          value={selectedCategoria}
          onChange={(e) => setSelectedCategoria(e.target.value)}
          style={styles.select}
        >
          <option value="">Seleccionar Categoría</option>
          {Array.isArray(categorias) &&
            categorias.map((categoria) => (
              <option key={categoria.id} value={categoria.id}>
                {categoria.nombre}
              </option>
            ))}
        </select>
      </div>

      {/* Lista de Productos en tarjetas */}
      <div style={styles.productGrid}>
        {productos.length === 0 ? (
          <p style={styles.noProductsMessage}>No hay productos disponibles</p>
        ) : (
          productos.map((producto) => (
            <div key={producto.id} style={styles.productCard}>
              <img
                src={`http://localhost:8080/api/productos/imagen/${producto.imagenUrl.split('/').pop()}`}
                alt={producto.nombre}
                style={styles.productImage}
              />
              <div style={styles.productDetails}>
                <h3 style={styles.productName}>{producto.nombre}</h3>
                <p style={styles.productDescription}>{producto.descripcion}</p>
                <p style={styles.productPrice}>Precio: ${producto.precio}</p>
              </div>
              <div style={styles.checkboxContainer}>
                <input
                  type="checkbox"
                  value={producto.id}
                  onChange={(e) => {
                    const selected = e.target.checked;
                    setSelectedProductos((prev) =>
                      selected ? [...prev, producto.id] : prev.filter((id) => id !== producto.id)
                    );
                  }}
                  style={styles.checkbox}
                />
                <label style={styles.checkboxLabel}>Seleccionar</label>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Botón de Asignar */}
      <button onClick={handleAsignar} style={styles.assignButton}>
        Asignar a Categoría
      </button>
    </div>
  );
};

// Estilos en línea simplificados
const styles = {
  container: {
    maxWidth: '1200px',
    margin: '20px auto',
    padding: '30px',
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  title: {
    textAlign: 'center',
    color: '#333',
    fontSize: '28px',
    marginBottom: '30px',
    fontWeight: '600',
  },
  formContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '40px',
  },
  label: {
    fontSize: '18px',
    fontWeight: '500',
    marginRight: '15px',
    color: '#333',
  },
  select: {
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ced4da',
    fontSize: '16px',
    width: '300px',
  },
  productGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '20px',
  },
  productCard: {
    border: '1px solid #ddd',
    borderRadius: '12px',
    padding: '20px',
    backgroundColor: '#f8f9fa',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    transition: 'transform 0.2s, box-shadow 0.2s',
  },
  productCardHover: {
    transform: 'translateY(-5px)',
    boxShadow: '0 12px 24px rgba(0, 0, 0, 0.15)',
  },
  productImage: {
    width: '100%',
    height: '180px',
    objectFit: 'cover',
    borderRadius: '8px',
    marginBottom: '15px',
  },
  productDetails: {
    marginBottom: '20px',
  },
  productName: {
    fontSize: '18px',
    color: '#333',
    marginBottom: '10px',
  },
  productDescription: {
    fontSize: '14px',
    color: '#555',
    marginBottom: '10px',
  },
  productPrice: {
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '10px',
  },
  checkboxContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkbox: {
    marginRight: '10px',
  },
  checkboxLabel: {
    fontSize: '14px',
    color: '#333',
  },
  assignButton: {
    backgroundColor: '#007bff',
    color: 'white',
    padding: '15px 30px',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '16px',
    width: '100%',
    marginTop: '30px',
    transition: 'background-color 0.3s ease, transform 0.3s ease',
  },
  errorMessage: {
    textAlign: 'center',
    color: '#e74c3c',
    fontSize: '18px',
    marginTop: '20px',
  },
  noProductsMessage: {
    textAlign: 'center',
    color: '#555',
    fontSize: '16px',
    marginTop: '20px',
  },
};

export default AsignarProductosACategoria;