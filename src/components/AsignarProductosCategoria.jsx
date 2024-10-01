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
        const token = localStorage.getItem('token');
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
        const token = localStorage.getItem('token');
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
      const token = localStorage.getItem('token');
      await axios.post(
        `https://backendspring.onrender.com/api/categorias/${selectedCategoria}/asignar-productos`,
        selectedProductos,
        {
          headers: {
            Authorization: `Bearer ${token}`,
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
    return <div style={styles.errorMessage}>{error}</div>;
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Asignar Productos a Categoría</h2>

      {/* Selector de Categoría */}
      <div style={styles.selectorContainer}>
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
                src={`https://backendspring.onrender.com/api/productos/imagen/${producto.imagenUrl.split('/').pop()}`}
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
      <button
        style={styles.assignButton}
        onClick={handleAsignar}
      >
        Asignar a Categoría
      </button>
    </div>
  );
};

// Estilos en línea
const styles = {
  container: {
    maxWidth: '1200px',
    margin: '40px auto',
    padding: '30px',
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
    fontFamily: "'Montserrat', sans-serif",
  },
  title: {
    textAlign: 'center',
    color: '#333333',
    fontSize: '2rem',
    marginBottom: '30px',
    fontWeight: '600',
  },
  selectorContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '30px',
  },
  label: {
    fontSize: '1rem',
    fontWeight: 'bold',
    color: '#333333',
    marginRight: '10px',
  },
  select: {
    padding: '10px',
    fontSize: '1rem',
    borderRadius: '8px',
    border: '1px solid #ddd',
    width: '250px',
    transition: 'border-color 0.3s ease',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  productGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '30px',
    justifyContent: 'center',
  },
  productCard: {
    border: '1px solid #ddd',
    borderRadius: '12px',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    boxShadow: '0 5px 10px rgba(0, 0, 0, 0.05)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    textAlign: 'center',
  },
  productCardHover: {
    transform: 'translateY(-5px)',
    boxShadow: '0 12px 24px rgba(0, 0, 0, 0.15)',
  },
  productImage: {
    width: '100%',
    height: '180px',
    objectFit: 'cover',
    borderRadius: '10px',
    marginBottom: '15px',
  },
  productDetails: {
    flexGrow: 1,
    textAlign: 'center',
    marginTop: '10px',
  },
  productName: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    marginBottom: '10px',
    color: '#333333',
  },
  productDescription: {
    fontSize: '0.9rem',
    color: '#555555',
  },
  productPrice: {
    fontWeight: 'bold',
    marginTop: '10px',
    fontSize: '1rem',
    color: '#2193b0',
  },
  checkboxContainer: {
    display: 'flex',
    alignItems: 'center',
    marginTop: '15px',
  },
  checkbox: {
    marginRight: '10px',
  },
  checkboxLabel: {
    fontSize: '1rem',
    color: '#333333',
  },
  assignButton: {
    backgroundColor: '#2193b0',
    color: 'white',
    padding: '15px 30px',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1.2rem',
    cursor: 'pointer',
    marginTop: '30px',
    width: '100%',
    transition: 'background-color 0.3s ease, transform 0.3s ease',
    boxShadow: '0 5px 10px rgba(0, 0, 0, 0.2)',
  },
  assignButtonHover: {
    backgroundColor: '#176582',
    transform: 'translateY(-2px)',
  },
  errorMessage: {
    color: '#ff4d4f',
    textAlign: 'center',
    fontSize: '18px',
    marginTop: '20px',
    fontWeight: '600',
  },
  noProductsMessage: {
    textAlign: 'center',
    color: '#555',
    fontSize: '16px',
    marginTop: '20px',
  },
};

export default AsignarProductosACategoria;