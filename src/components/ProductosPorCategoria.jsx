import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import '../components/Styles/ProductosList.css';

const ProductosPorCategoria = () => {
  const [productos, setProductos] = useState([]);
  const [error, setError] = useState('');
  const [cantidades, setCantidades] = useState({});
  const [categoria, setCategoria] = useState('');

  const fetchProductosPorCategoria = async (categoriaSeleccionada) => {
    const token = localStorage.getItem('token');
    if (!categoriaSeleccionada) {
      setError('Por favor, ingrese una categoría.');
      return;
    }

    try {
      const response = await axios.get(`https://backendspring.onrender.com/api/productos/categoria/${categoriaSeleccionada}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (Array.isArray(response.data)) {
        setProductos(response.data);
        setError('');
      } else {
        setError('La respuesta del servidor no es válida.');
      }
    } catch (err) {
      setError('No se pudo obtener la lista de productos.');
    }
  };

  const handleCategoriaChange = (e) => {
    setCategoria(e.target.value);
  };

  const handleBuscarProductos = () => {
    fetchProductosPorCategoria(categoria);
  };

  const handleCantidadChange = (productoId, nuevaCantidad) => {
    setCantidades((prevCantidades) => ({
      ...prevCantidades,
      [productoId]: nuevaCantidad,
    }));
  };

  const agregarAlCarrito = async (productoId) => {
    const token = localStorage.getItem('token');
    const cantidad = cantidades[productoId] || 1;
    try {
      await axios.post(
        'https://backendspring.onrender.com/api/carrito/agregar',
        {
          producto: { id: productoId },
          cantidad: cantidad,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      Swal.fire({
        title: 'Producto agregado',
        text: 'El producto ha sido agregado al carrito correctamente.',
        icon: 'success',
        confirmButtonText: 'Aceptar',
      });
    } catch (error) {
      console.error('Error al agregar producto al carrito:', error);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Catálogo de Productos por Categoría</h2>

      {/* Formulario para ingresar la categoría */}
      <div style={styles.formContainer}>
        <label htmlFor="categoria-input" style={styles.label}>
          Ingrese la Categoría:
        </label>
        <input
          type="text"
          id="categoria-input"
          value={categoria}
          onChange={handleCategoriaChange}
          placeholder="Femenino, Masculino, Niños..."
          style={styles.input}
        />
        <button onClick={handleBuscarProductos} style={styles.button}>
          Buscar Productos
        </button>
      </div>

      {/* Mostrar productos según la categoría seleccionada */}
      <div style={styles.productGrid}>
        {productos.length > 0 ? (
          productos.map((producto) => (
            <div key={producto.id} style={styles.productCard}>
              <img
                src={`https://backendspring.onrender.com/api/productos/imagen/${producto.imagenUrl.split('/').pop()}`}
                alt={producto.nombre}
                style={styles.productImage}
              />
              <h3 style={styles.productName}>{producto.nombre}</h3>
              <p style={styles.productDescription}>{producto.descripcion}</p>
              <p style={styles.productPrice}>
                <strong>Precio:</strong> ${producto.precio}
              </p>

              {/* Mostrar colores del producto gráficamente */}
              <div style={styles.colorContainer}>
                {producto.colores &&
                  producto.colores.map((color) => (
                    <span
                      key={color.id}
                      style={{
                        ...styles.colorBox,
                        backgroundColor: color.codigoHex,
                      }}
                    ></span>
                  ))}
              </div>

              <div style={styles.quantityContainer}>
                <label htmlFor={`cantidad-${producto.id}`} style={styles.quantityLabel}>
                  Cantidad:
                </label>
                <input
                  id={`cantidad-${producto.id}`}
                  type="number"
                  value={cantidades[producto.id] || 1}
                  min="1"
                  onChange={(e) => handleCantidadChange(producto.id, e.target.value)}
                  style={styles.quantityInput}
                />
              </div>

              <button onClick={() => agregarAlCarrito(producto.id)} style={styles.addButton}>
                Agregar al carrito
              </button>
            </div>
          ))
        ) : (
          <p style={styles.noProductsMessage}>No hay productos en la categoría seleccionada.</p>
        )}
      </div>
    </div>
  );
};

// Estilos en línea simplificados, manteniendo la coherencia con ProductosList.css
const styles = {
  container: {
    maxWidth: '1200px',
    margin: '20px auto',
    padding: '30px',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  title: {
    textAlign: 'center',
    color: '#343a40',
    marginBottom: '30px',
    fontSize: '28px',
    fontWeight: '600',
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '40px',
  },
  label: {
    marginBottom: '10px',
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#343a40',
  },
  input: {
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ced4da',
    marginBottom: '15px',
    width: '300px',
    fontSize: '16px',
  },
  button: {
    backgroundColor: '#007bff',
    color: 'white',
    padding: '12px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background-color 0.3s ease, transform 0.3s ease',
  },
  productGrid: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '30px',
    justifyContent: 'center',
  },
  productCard: {
    backgroundColor: '#ffffff',
    border: '1px solid #ddd',
    borderRadius: '8px',
    width: '250px',
    textAlign: 'center',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    padding: '20px',
    transition: 'transform 0.2s, box-shadow 0.2s',
  },
  productImage: {
    width: '100%',
    height: '180px',
    objectFit: 'cover',
    borderRadius: '8px',
    marginBottom: '15px',
  },
  productName: {
    fontSize: '18px',
    color: '#495057',
    marginBottom: '10px',
    fontWeight: '500',
  },
  productDescription: {
    fontSize: '14px',
    color: '#6c757d',
    marginBottom: '15px',
  },
  productPrice: {
    fontSize: '16px',
    color: '#495057',
    marginBottom: '20px',
    fontWeight: 'bold',
  },
  colorContainer: {
    marginBottom: '15px',
  },
  colorBox: {
    width: '20px',
    height: '20px',
    display: 'inline-block',
    borderRadius: '4px',
    margin: '2px',
    border: '1px solid #ddd',
  },
  quantityContainer: {
    marginBottom: '15px',
  },
  quantityLabel: {
    fontSize: '14px',
    color: '#495057',
    marginRight: '10px',
  },
  quantityInput: {
    width: '60px',
    padding: '5px',
    borderRadius: '5px',
    border: '1px solid #ced4da',
    fontSize: '14px',
  },
  addButton: {
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    padding: '12px 20px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background-color 0.3s ease, transform 0.3s ease',
  },
  noProductsMessage: {
    textAlign: 'center',
    color: '#6c757d',
    fontSize: '16px',
    marginTop: '20px',
  },
};

export default ProductosPorCategoria;