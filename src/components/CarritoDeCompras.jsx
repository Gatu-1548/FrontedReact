// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const CarritoDeCompras = () => {
//   const [carrito, setCarrito] = useState([]);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     const fetchCarrito = async () => {
//       try {
//         const response = await axios.get('http://localhost:8080/api/carrito/obtener', {
//           headers: {
//             Authorization: `Bearer ${token}`
//           }
//         });
//         setCarrito(response.data);
//       } catch (err) {
//         setError('No se pudo obtener el carrito');
//         console.error(err);
//       }
//     };

//     fetchCarrito();
//   }, []);

//   if (error) {
//     return <div className="error-message">{error}</div>;
//   }

//   return (
//     <div className="carrito-container">
//       <h2>Carrito de Compras</h2>
//       <ul>
//         {carrito.map((item, index) => (
//           <li key={index}>
//             <strong>{item.nombre}</strong> - Cantidad: {item.cantidad}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default CarritoDeCompras;


// ------------------------------------------CODIGO ANTES DE IMPLEMENTAR EL METODO DE PAGO --------------------------------------------------------------
// CarritoDeCompras.js
// CarritoDeCompras.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';  // Importar SweetAlert
import '../components/Styles/CarritoDeCompras.css'; // Archivo CSS para los estilos

const CarritoDeCompras = () => {
  const [carrito, setCarrito] = useState([]);
  const [total, setTotal] = useState(0);  // Estado para el total
  const [error, setError] = useState('');
  const [mensajeCarritoVacio, setMensajeCarritoVacio] = useState('');  // Nuevo estado para el mensaje de carrito vacío
  const navigate = useNavigate();  // Hook para redirigir

  useEffect(() => {
    const token = localStorage.getItem('token');
    const fetchCarrito = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/carrito/obtener', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        // Verificar si el carrito está vacío
        if (!response.data.productos || response.data.productos.length === 0) {
          setMensajeCarritoVacio('Aún no tienes productos en tu carrito.'); // Mensaje si el carrito está vacío
        } else {
          // Asegurarse de que la estructura de datos es la esperada
          if (response.data.productos && Array.isArray(response.data.productos)) {
            const carritoProductos = response.data.productos.map((producto) => ({
              id: producto.id,
              nombre: producto.nombre,
              cantidad: producto.cantidad,
              imagenUrl: producto.imagenUrl,
              precio: producto.precio || 0 // Asegurar que el precio exista para cálculos
            }));

            setCarrito(carritoProductos);  // Actualizar los productos del carrito
            setTotal(response.data.total || 0);  // Actualizar el total, asegurarse que el total no sea null o undefined
          } else {
            setError('La estructura de datos recibida del servidor es inválida.');
            console.error('Estructura de datos del carrito:', response.data);
          }
        }
      } catch (err) {
        setError('No se pudo obtener el carrito');
        console.error('Error al obtener el carrito:', err);
      }
    };

    fetchCarrito();
  }, []);

  // Manejar la redirección al seleccionar el botón de Realizar Pago
  const handleRealizarPago = () => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "¿Seguro que quieres realizar este pago?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, quiero pagar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        navigate('/opcionesdepago');  // Redirigir a la vista de opciones de pago si se confirma
      }
    });
  };

  // Nueva función para eliminar productos del carrito
  const handleEliminarProducto = async (productoId) => {
    if (!productoId) {
      console.error('ProductoId no proporcionado para eliminar.');
      Swal.fire({
        title: 'Error',
        text: 'No se pudo eliminar el producto porque el ID es inválido.',
        icon: 'error',
        confirmButtonText: 'Aceptar',
      });
      return;
    }

    const token = localStorage.getItem('token');
    try {
      // Realizar la solicitud DELETE al backend para eliminar el producto del carrito
      await axios.delete(`http://localhost:8080/api/carrito/eliminar/${productoId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      // Filtrar los productos eliminados del carrito en el estado local
      const carritoActualizado = carrito.filter(item => item.id !== productoId);
      setCarrito(carritoActualizado);

      // Buscar el producto eliminado en el carrito original para calcular el total
      const productoEliminado = carrito.find(item => item.id === productoId);
      if (productoEliminado) {
        setTotal(total - (productoEliminado.cantidad * productoEliminado.precio)); // Actualizar el total
      }

      // Verificar si el carrito está vacío después de eliminar un producto
      if (carritoActualizado.length === 0) {
        setMensajeCarritoVacio('Aún no tienes productos en tu carrito.');  // Mostrar mensaje si el carrito queda vacío
      }

      Swal.fire({
        title: 'Producto eliminado',
        text: 'El producto ha sido eliminado del carrito correctamente.',
        icon: 'success',
        confirmButtonText: 'Aceptar',
      });
    } catch (error) {
      console.error('Error al eliminar producto del carrito:', error);
      Swal.fire({
        title: 'Error',
        text: 'Hubo un error al eliminar el producto del carrito. Intenta de nuevo.',
        icon: 'error',
        confirmButtonText: 'Aceptar',
      });
    }
  };

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="carrito-container">
      <h2>Carrito de Compras</h2>
      {mensajeCarritoVacio ? (
        <div className="mensaje-carrito-vacio">
          <p>{mensajeCarritoVacio}</p> {/* Mostrar mensaje de carrito vacío */}
        </div>
      ) : (
        <>
          <div className="productos-grid">
            {carrito.map((item, index) => {
              console.log("Producto en el carrito:", item); // Verificar la estructura de cada item
              return (
                <div key={index} className="producto-card">
                  {item.imagenUrl ? (
                    <img 
                      src={item.imagenUrl} 
                      alt={item.nombre} 
                      className="producto-imagen" 
                    />
                  ) : (
                    <p>Imagen no disponible</p>
                  )}
                  <div className="producto-detalles">
                    <h3>{item.nombre}</h3>
                    <p>Cantidad: {item.cantidad}</p>
                  </div>
                  {/* Botón para eliminar el producto */}
                  {item.id && (
                    <button
                      className="eliminar-button"
                      onClick={() => handleEliminarProducto(item.id)}  // Usar el id del producto
                    >
                      Eliminar
                    </button>
                  )}
                </div>
              );
            })}
          </div>
          <div className="carrito-total">
            <h3>Total a pagar: ${total.toFixed(2)}</h3> {/* Mostrar el total con 2 decimales */}
          </div>
          <div className="realizar-pago-container">
            <button className="realizar-pago-button" onClick={handleRealizarPago}>
              Realizar Pago
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CarritoDeCompras;





///--------para pagos net----------------------------------------------------

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import '../components/Styles/CarritoDeCompras.css'; // Archivo CSS para los estilos

// const CarritoDeCompras = () => {
//   const [carrito, setCarrito] = useState([]);
//   const [total, setTotal] = useState(0);  // Estado para el total
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     const fetchCarrito = async () => {
//       try {
//         const response = await axios.get('http://localhost:8080/api/carrito/obtener', {
//           headers: {
//             Authorization: `Bearer ${token}`
//           }
//         });
//         setCarrito(response.data.productos);  // Actualizar los productos del carrito
//         setTotal(response.data.total);  // Actualizar el total
//       } catch (err) {
//         setError('No se pudo obtener el carrito');
//         console.error(err);
//       }
//     };

//     fetchCarrito();
//   }, []);

//   const realizarPago = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await axios.post('http://localhost:8080/api/pagos/realizar-pago', {
//         amount: total,  // Enviar el total al backend
//         description: 'Pago de carrito de compras'
//       }, {
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       });

//       // Redirigir al usuario a la pasarela de PagosNet
//       window.location.href = response.data;
//     } catch (error) {
//       console.error('Error al procesar el pago:', error);
//     }
//   };

//   if (error) {
//     return <div className="error-message">{error}</div>;
//   }

//   return (
//     <div className="carrito-container">
//       <h2>Carrito de Compras</h2>
//       <div className="productos-grid">
//         {carrito.map((item, index) => (
//           <div key={index} className="producto-card">
//             {item.imagenUrl ? (
//               <img 
//                 src={item.imagenUrl} 
//                 alt={item.nombre} 
//                 className="producto-imagen" 
//               />
//             ) : (
//               <p>Imagen no disponible</p>
//             )}
//             <div className="producto-detalles">
//               <h3>{item.nombre}</h3>
//               <p>Cantidad: {item.cantidad}</p>
//             </div>
//           </div>
//         ))}
//       </div>
//       <div className="carrito-total">
//         <h3>Total a pagar: ${total.toFixed(2)}</h3> {/* Mostrar el total con 2 decimales */}
//         <button onClick={realizarPago}>Pagar</button> {/* Botón para iniciar el pago */}
//       </div>
//     </div>
//   );
// };

// export default CarritoDeCompras;
