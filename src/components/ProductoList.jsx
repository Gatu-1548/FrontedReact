// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import Swal from 'sweetalert2';
// import '../components/Styles/ProductosList.css'; // Asegúrate de crear este archivo CSS

// const ProductosList = () => {
//   const [productos, setProductos] = useState([]);
//   const [error, setError] = useState('');
//   const [cantidades, setCantidades] = useState({}); // Estado para manejar las cantidades por producto

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     const fetchProductos = async () => {
//       try {
//         const response = await axios.get('http://localhost:8080/api/productos', {
//           headers: {
//             Authorization: `Bearer ${token}`
//           }
//         });
//         setProductos(response.data);
//       } catch (err) {
//         setError('No se pudo obtener la lista de productos');
//         console.error(err);
//       }
//     };

//     fetchProductos();
//   }, []);

//   // Función para manejar el cambio de cantidad para un producto específico
//   const handleCantidadChange = (productoId, nuevaCantidad) => {
//     setCantidades((prevCantidades) => ({
//       ...prevCantidades,
//       [productoId]: nuevaCantidad, // Actualizar la cantidad solo para el producto seleccionado
//     }));
//   };

//   // Función para agregar producto al carrito
//   const agregarAlCarrito = async (productoId) => {
//     const token = localStorage.getItem('token');
//     const cantidad = cantidades[productoId] || 1; // Usar la cantidad seleccionada, por defecto 1 si no se ha seleccionado
//     try {
//       const response = await axios.post('http://localhost:8080/api/carrito/agregar', {
//         producto: { id: productoId },
//         cantidad: cantidad,
//       }, {
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       });
      
//       // Mostrar alerta SweetAlert2 al agregar el producto
//       Swal.fire({
//         title: 'Producto agregado',
//         text: 'El producto ha sido agregado al carrito correctamente.',
//         icon: 'success',
//         confirmButtonText: 'Aceptar'
//       });

//       console.log('Producto agregado al carrito:', response.data);
//     } catch (error) {
//       console.error('Error al agregar producto al carrito:', error);
//     }
//   };

//   if (error) {
//     return <div className="error-message">{error}</div>;
//   }

//   return (
//     <div className="productos-list-container">
//       <h2>Catálogo de Productos</h2>
//       <div className="productos-grid">
//         {productos.map((producto) => (
//           <div key={producto.id} className="producto-card">
//             <img src={`http://localhost:8080/api/productos/imagen/${producto.imagenUrl.split('/').pop()}`} alt={producto.nombre} className="producto-imagen" />
//             <h3>{producto.nombre}</h3>
//             <p>{producto.descripcion}</p>
//             <p><strong>Precio:</strong> ${producto.precio}</p>
//             {/* Input para la cantidad */}
//             <div className="cantidad-container">
//               <label htmlFor={`cantidad-${producto.id}`}>Cantidad:</label>
//               <input
//                 id={`cantidad-${producto.id}`}
//                 type="number"
//                 value={cantidades[producto.id] || 1} // Mostrar la cantidad seleccionada o 1 por defecto
//                 min="1"
//                 onChange={(e) => handleCantidadChange(producto.id, e.target.value)} // Actualiza la cantidad solo para este producto
//               />
//             </div>
//             {/* Botón para agregar al carrito */}
//             <button onClick={() => agregarAlCarrito(producto.id)}>
//               Agregar al carrito
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ProductosList;



import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import '../components/Styles/ProductosList.css'; // Asegúrate de crear este archivo CSS

const ProductosList = () => {
  const [productos, setProductos] = useState([]);
  const [error, setError] = useState('');
  const [cantidades, setCantidades] = useState({}); // Estado para manejar las cantidades por producto

  useEffect(() => {
    const token = localStorage.getItem('token');
    const fetchProductos = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/productos', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setProductos(response.data);
      } catch (err) {
        setError('No se pudo obtener la lista de productos');
        console.error(err);
      }
    };

    fetchProductos();
  }, []);

  const handleCantidadChange = (productoId, nuevaCantidad) => {
    setCantidades((prevCantidades) => ({
      ...prevCantidades,
      [productoId]: nuevaCantidad, // Actualizar la cantidad solo para el producto seleccionado
    }));
  };

  const agregarAlCarrito = async (productoId) => {
    const token = localStorage.getItem('token');
    const cantidad = cantidades[productoId] || 1; // Usar la cantidad seleccionada, por defecto 1 si no se ha seleccionado
    try {
      const response = await axios.post('http://localhost:8080/api/carrito/agregar', {
        producto: { id: productoId },
        cantidad: cantidad,
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      Swal.fire({
        title: 'Producto agregado',
        text: 'El producto ha sido agregado al carrito correctamente.',
        icon: 'success',
        confirmButtonText: 'Aceptar'
      });

    } catch (error) {
      console.error('Error al agregar producto al carrito:', error);
    }
  };

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="productos-list-container">
      <h2>Catálogo de Productos</h2>
      <div className="productos-grid">
        {productos.map((producto) => (
          <div key={producto.id} className="producto-card">
            <img src={`http://localhost:8080/api/productos/imagen/${producto.imagenUrl.split('/').pop()}`} alt={producto.nombre} className="producto-imagen" />
            <h3>{producto.nombre}</h3>
            <p>{producto.descripcion}</p>
            <p><strong>Precio:</strong> ${producto.precio}</p>
            
            {/* Mostrar colores del producto gráficamente */}
            <div className="colores-disponibles">
              {producto.colores.map((color) => (
                <span
                  key={color.id}
                  className="color-cuadro"
                  style={{ backgroundColor: color.codigoHex, width: '20px', height: '20px', display: 'inline-block', margin: '0 5px' }}
                ></span>
              ))}
            </div>


            <div className="cantidad-container">
              <label htmlFor={`cantidad-${producto.id}`}>Cantidad:</label>
              <input
                id={`cantidad-${producto.id}`}
                type="number"
                value={cantidades[producto.id] || 1} // Mostrar la cantidad seleccionada o 1 por defecto
                min="1"
                onChange={(e) => handleCantidadChange(producto.id, e.target.value)} // Actualiza la cantidad solo para este producto
              />
            </div>

            <button onClick={() => agregarAlCarrito(producto.id)}>
              Agregar al carrito
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductosList;
