// import React, { useState } from 'react';
// import axios from 'axios';
// import '../components/Styles/CrearProducto.css';  // Asegúrate de tener un archivo de estilos

// const CrearProducto = () => {
//   const [producto, setProducto] = useState({
//     nombre: '',
//     descripcion: '',
//     precio: ''
//   });
//   const [imagen, setImagen] = useState(null);  // Para manejar el archivo de imagen
//   const [mensaje, setMensaje] = useState('');

//   const handleInputChange = (e) => {
//     setProducto({
//       ...producto,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleImagenChange = (e) => {
//     setImagen(e.target.files[0]);  // Capturar el archivo de imagen
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append('nombre', producto.nombre);
//     formData.append('descripcion', producto.descripcion);
//     formData.append('precio', producto.precio);
//     formData.append('imagen', imagen);  // Adjuntar la imagen al formData

//     try {
//       const token = localStorage.getItem('token');
//       await axios.post('http://localhost:8080/api/productos/crear-con-imagen', formData, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           'Content-Type': 'multipart/form-data'  // Especificar el tipo de contenido
//         }
//       });
//       setMensaje('Producto creado exitosamente');
//       setProducto({ nombre: '', descripcion: '', precio: '' });
//       setImagen(null);  // Limpiar el archivo de imagen
//     } catch (error) {
//       console.error('Error al crear el producto', error);
//       setMensaje('Error al crear el producto');
//     }
//   };

//   return (
//     <div className="crear-producto-container">
//       <h2>Crear Producto</h2>
//       <form onSubmit={handleSubmit} encType="multipart/form-data">
//         <div className="form-group">
//           <label>Nombre:</label>
//           <input
//             type="text"
//             name="nombre"
//             value={producto.nombre}
//             onChange={handleInputChange}
//             required
//           />
//         </div>

//         <div className="form-group">
//           <label>Descripción:</label>
//           <input
//             type="text"
//             name="descripcion"
//             value={producto.descripcion}
//             onChange={handleInputChange}
//             required
//           />
//         </div>

//         <div className="form-group">
//           <label>Precio:</label>
//           <input
//             type="number"
//             name="precio"
//             value={producto.precio}
//             onChange={handleInputChange}
//             required
//           />
//         </div>

//         <div className="form-group">
//           <label>Subir Imagen:</label>
//           <input
//             type="file"
//             name="imagen"
//             accept="image/*"
//             onChange={handleImagenChange}
//             required
//           />
//         </div>

//         <button type="submit" className="crear-producto-boton">Crear Producto</button>
//       </form>
//       {mensaje && <p className="mensaje">{mensaje}</p>}
//     </div>
//   );
// };

// export default CrearProducto;





//FUNCIONA HASTA METODOS DE PAGO----------------------------------------------------------------------------------------------------------------------------
// import React, { useState } from 'react';
// import axios from 'axios';
// import { ChromePicker } from 'react-color';  // Importa el selector de color
// import '../components/Styles/CrearProducto.css';  // Asegúrate de tener un archivo de estilos

// const CrearProducto = () => {
//   const [producto, setProducto] = useState({
//     nombre: '',
//     descripcion: '',
//     precio: ''
//   });
//   const [imagen, setImagen] = useState(null);  // Para manejar el archivo de imagen
//   const [coloresSeleccionados, setColoresSeleccionados] = useState([]);  // Colores seleccionados desde la paleta
//   const [nuevoColor, setNuevoColor] = useState('#000000');  // Color temporal para la paleta
//   const [mensaje, setMensaje] = useState('');

//   const handleInputChange = (e) => {
//     setProducto({
//       ...producto,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleImagenChange = (e) => {
//     setImagen(e.target.files[0]);  // Capturar el archivo de imagen
//   };

//   // Actualiza el color temporalmente mientras el usuario ajusta la paleta
//   const handleNuevoColorChange = (color) => {
//     setNuevoColor(color.hex);
//   };

//   // Solo agrega el color cuando el usuario hace clic en el botón de confirmar
//   const agregarColorSeleccionado = () => {
//     setColoresSeleccionados((prevColores) => [...prevColores, nuevoColor]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append('nombre', producto.nombre);
//     formData.append('descripcion', producto.descripcion);
//     formData.append('precio', producto.precio);
//     formData.append('imagen', imagen);  // Adjuntar la imagen al formData

//     // Adjuntar los colores seleccionados desde la paleta (enviados como una lista)
//     coloresSeleccionados.forEach((colorHex) => {
//       formData.append('nuevoColor[]', colorHex);  // Enviar todos los colores seleccionados desde la paleta como lista
//     });

//     try {
//       const token = localStorage.getItem('token');
//       await axios.post('http://localhost:8080/api/productos/crear-con-imagen', formData, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           'Content-Type': 'multipart/form-data'  // Especificar el tipo de contenido
//         }
//       });
//       setMensaje('Producto creado exitosamente');
//       setProducto({ nombre: '', descripcion: '', precio: '' });
//       setImagen(null);  // Limpiar el archivo de imagen
//       setColoresSeleccionados([]);  // Limpiar la selección de colores
//     } catch (error) {
//       console.error('Error al crear el producto', error);
//       setMensaje('Error al crear el producto');
//     }
// };






//   return (
//     <div className="crear-producto-container">
//       <h2>Crear Producto</h2>
//       <form onSubmit={handleSubmit} encType="multipart/form-data">
//         <div className="form-group">
//           <label>Nombre:</label>
//           <input
//             type="text"
//             name="nombre"
//             value={producto.nombre}
//             onChange={handleInputChange}
//             required
//           />
//         </div>

//         <div className="form-group">
//           <label>Descripción:</label>
//           <input
//             type="text"
//             name="descripcion"
//             value={producto.descripcion}
//             onChange={handleInputChange}
//             required
//           />
//         </div>

//         <div className="form-group">
//           <label>Precio:</label>
//           <input
//             type="number"
//             name="precio"
//             value={producto.precio}
//             onChange={handleInputChange}
//             required
//           />
//         </div>

//         <div className="form-group">
//           <label>Subir Imagen:</label>
//           <input
//             type="file"
//             name="imagen"
//             accept="image/*"
//             onChange={handleImagenChange}
//             required
//           />
//         </div>

//         {/* Paleta de colores para seleccionar un nuevo color */}
//         <div className="form-group">
//           <label>Seleccionar un nuevo color (paleta):</label>
//           <ChromePicker
//             color={nuevoColor}
//             onChange={handleNuevoColorChange}  // Cambia el color mientras ajustas
//           />
//         </div>

//         {/* Botón para confirmar la selección de color */}
//         <div className="form-group">
//           <button type="button" onClick={agregarColorSeleccionado} className="agregar-color-boton">
//             Confirmar Color
//           </button>
//         </div>

//         {/* Mostrar los colores seleccionados */}
//         <div className="form-group">
//           <label>Colores seleccionados:</label>
//           <div className="colores-seleccionados">
//             {coloresSeleccionados.map((color, index) => (
//               <span
//                 key={index}
//                 className="color-cuadro"
//                 style={{ backgroundColor: color, width: '20px', height: '20px', display: 'inline-block', margin: '0 10px' }}
//               ></span>
//             ))}
//           </div>
//         </div>

//         <button type="submit" className="crear-producto-boton">Crear Producto</button>
//       </form>
//       {mensaje && <p className="mensaje">{mensaje}</p>}
//     </div>
//   );
// };

// export default CrearProducto;





import React, { useState } from 'react';
import axios from 'axios';
import { ChromePicker } from 'react-color';  // Importa el selector de color
import '../components/Styles/CrearProducto.css';  // Asegúrate de tener un archivo de estilos

const CrearProducto = () => {
  const [producto, setProducto] = useState({
    nombre: '',
    descripcion: '',
    precio: ''
  });
  const [imagen, setImagen] = useState(null);  // Para manejar el archivo de imagen
  const [coloresSeleccionados, setColoresSeleccionados] = useState([]);  // Colores seleccionados desde la paleta
  const [nuevoColor, setNuevoColor] = useState('#000000');  // Color temporal para la paleta
  const [cantidades, setCantidades] = useState({});  // Manejamos las cantidades por color
  const [mensaje, setMensaje] = useState('');

  const handleInputChange = (e) => {
    setProducto({
      ...producto,
      [e.target.name]: e.target.value
    });
  };

  const handleImagenChange = (e) => {
    setImagen(e.target.files[0]);  // Capturar el archivo de imagen
  };

  // Actualiza el color temporalmente mientras el usuario ajusta la paleta
  const handleNuevoColorChange = (color) => {
    setNuevoColor(color.hex);
  };

  // Agregar el color seleccionado con su cantidad
  const agregarColorSeleccionado = () => {
    if (nuevoColor) {
      setColoresSeleccionados((prevColores) => [...prevColores, nuevoColor]);
    }
  };

  const handleCantidadChange = (color, cantidad) => {
    setCantidades({
      ...cantidades,
      [color]: cantidad
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Crear un objeto FormData para enviar los datos al backend
    const formData = new FormData();
    formData.append('nombre', producto.nombre);
    formData.append('descripcion', producto.descripcion);
    formData.append('precio', producto.precio);
    formData.append('imagen', imagen); // Adjuntar la imagen
  
    // Adjuntar los colores seleccionados como parámetros separados
    coloresSeleccionados.forEach((colorHex) => {
      formData.append('nuevoColor', colorHex);  // Agregar cada color como 'nuevoColor'
    });
  
    // Convertir el inventario a JSON y agregarlo al formData
    formData.append('inventario', JSON.stringify(
      coloresSeleccionados.map((color) => ({
        color: color,
        cantidad: cantidades[color] || 0  // Agregar la cantidad de cada color, si no hay cantidad, agregar 0
      }))
    ));
  
    try {
      // Obtener el token almacenado en localStorage
      const token = localStorage.getItem('token');
  
      // Realizar la petición POST al backend para crear el producto con imagen y colores
      const response = await axios.post(
        'http://localhost:8080/api/productos/crear-con-imagen-y-inventario',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'  // Especificar el tipo de contenido para el formData
          }
        }
      );
  
      // Mensaje de éxito si la operación se completa correctamente
      setMensaje('Producto creado exitosamente');
      setProducto({ nombre: '', descripcion: '', precio: '' });
      setImagen(null);  // Limpiar la imagen
      setColoresSeleccionados([]);  // Limpiar los colores seleccionados
      setCantidades({});  // Limpiar las cantidades
    } catch (error) {
      // Manejo de error en caso de fallo al crear el producto
      console.error('Error al crear el producto', error);
      setMensaje('Error al crear el producto');
    }
  };
  
  

  return (
    <div className="crear-producto-container">
      <h2>Crear Producto</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        {/* Campos de formulario existentes */}
        <div className="form-group">
          <label>Nombre:</label>
          <input
            type="text"
            name="nombre"
            value={producto.nombre}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Descripción:</label>
          <input
            type="text"
            name="descripcion"
            value={producto.descripcion}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Precio:</label>
          <input
            type="number"
            name="precio"
            value={producto.precio}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Subir Imagen:</label>
          <input
            type="file"
            name="imagen"
            accept="image/*"
            onChange={handleImagenChange}
            required
          />
        </div>

        {/* Selección de colores */}
        <div className="form-group">
          <label>Seleccionar un nuevo color (paleta):</label>
          <ChromePicker
            color={nuevoColor}
            onChange={handleNuevoColorChange}  // Cambia el color mientras ajustas
          />
          <button type="button" onClick={agregarColorSeleccionado} className="agregar-color-boton">
            Confirmar Color
          </button>
        </div>

        {/* Mostrar colores seleccionados con cantidad */}
        <div className="form-group">
          <label>Colores seleccionados con cantidades:</label>
          <div className="colores-seleccionados">
            {coloresSeleccionados.map((color, index) => (
              <div key={index} className="color-cantidad">
                <span
                  className="color-cuadro"
                  style={{ backgroundColor: color, width: '20px', height: '20px', display: 'inline-block', margin: '0 10px' }}
                ></span>
                <input
                  type="number"
                  placeholder="Cantidad"
                  value={cantidades[color] || 0}
                  onChange={(e) => handleCantidadChange(color, parseInt(e.target.value))}
                />
              </div>
            ))}
          </div>
        </div>

        <button type="submit" className="crear-producto-boton">Crear Producto</button>
      </form>
      {mensaje && <p className="mensaje">{mensaje}</p>}
    </div>
  );
};

export default CrearProducto;
