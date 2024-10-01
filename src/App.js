

//--------------------------------------------------------------------------------------------
// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Login from '../src/components/Login';
// import Menu from '../src/components/Menu';
// import Register from './components/Register';
// import Navbar from './components/Navbar'; // Importa el Navbar

// const App = () => {
//   return (
//     <Router>
//       <Routes>
//         {/* Login y Register no tendrán el Navbar */}
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />

//         {/* Rutas con el Navbar */}
//         <Route path="/menu" element={
//           <>
//             <Navbar /> {/* El Navbar estará visible aquí */}
//             <Menu />
//           </>
//         } />
//       </Routes>
//     </Router>
//   );
// };

// export default App;
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from '../src/components/Login';
import Menu from '../src/components/Menu';
import Register from './components/Register';
import Perfil from './components/Perfil';
import Navbar from './components/Navbar';
import UsuariosList from './components/UsuariosList';
import ProductosList from './components/ProductoList';
import CrearProducto from './components/CrearProducto';
import Home from './components/Home';
import CarritoDeCompras from './components/CarritoDeCompras';
import CrearCategoria from './components/CrearCategoria';
import AsignarProductosCategoria from './components/AsignarProductosCategoria';
import OpcionesDePago from './components/OpcionesDePago';  // Importa el nuevo componente OpcionesDePago
import PagoEnEfectivo from './components/PagoEfectivo'; // Importar componente PagoEnEfectivo
import PagoQR from './components/PagoQr'; // Importar componente PagoQR
import InventarioList from './components/InventarioList';

//import InventarioList from './components/InventarioList';
import ProductosPorCategoria from './components/ProductosPorCategoria';

// Función para verificar si el usuario está autenticado
const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};

const App = () => {
  const [authenticated, setAuthenticated] = useState(isAuthenticated());

  useEffect(() => {
    setAuthenticated(isAuthenticated());
  }, []);

  const handleLogout = () => {
    setAuthenticated(false);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={authenticated ? <Navigate to="/menu" /> : <Home />} />
        <Route path="/login" element={authenticated ? <Navigate to="/menu" /> : <Login onLoginSuccess={() => setAuthenticated(true)} />} />
        <Route path="/register" element={authenticated ? <Navigate to="/menu" /> : <Register />} />
        <Route path="/menu" element={authenticated ? <><Navbar onLogout={handleLogout} /><Menu /></> : <Navigate to="/login" />} />
        <Route path="/perfil" element={authenticated ? <><Navbar onLogout={handleLogout} /><Perfil /></> : <Navigate to="/login" />} />
        <Route path="/usuarios" element={authenticated ? <><Navbar onLogout={handleLogout} /><UsuariosList /></> : <Navigate to="/login" />} />
        <Route path="/productolist" element={authenticated ? <><Navbar onLogout={handleLogout} /><ProductosList /></> : <Navigate to="/login" />} />
        <Route path="/carritodecompras" element={authenticated ? <><Navbar onLogout={handleLogout} /><CarritoDeCompras /></> : <Navigate to="/login" />} />

        {/* Ruta para crear producto */}
        <Route path="/crear-producto" element={authenticated ? <><Navbar onLogout={handleLogout} /><CrearProducto /></> : <Navigate to="/login" />} />

        {/* Rutas para la gestión de categorías */}
        <Route path="/crearcategoria" element={authenticated ? <><Navbar onLogout={handleLogout} /><CrearCategoria /></> : <Navigate to="/login" />} />
        <Route path="/asignarproductoscategoria" element={authenticated ? <><Navbar onLogout={handleLogout} /><AsignarProductosCategoria /></> : <Navigate to="/login" />} />

        {/* Nueva ruta para la vista de Opciones de Pago */}
        <Route path="/opcionesdepago" element={authenticated ? <><Navbar onLogout={handleLogout} /><OpcionesDePago /></> : <Navigate to="/login" />} />

        {/* Nuevas rutas para las vistas de confirmación de pago */}
        <Route path="/pago-efectivo" element={authenticated ? <><Navbar onLogout={handleLogout} /><PagoEnEfectivo /></> : <Navigate to="/login" />} />
        <Route path="/pago-qr" element={authenticated ? <><Navbar onLogout={handleLogout} /><PagoQR /></> : <Navigate to="/login" />} />


        {/* Ruta para inventario*/}

        <Route path="/inventariolist" element={authenticated ? <><Navbar onLogout={handleLogout} /><InventarioList /></> : <Navigate to="/login" />} />


        {/* Ruta para Categorias*/}

        <Route path="/productosporcategoria" element={authenticated ? <><Navbar onLogout={handleLogout} /><ProductosPorCategoria /></> : <Navigate to="/login" />} />

        {/* Ruta por defecto */}
        <Route path="*" element={<Navigate to={authenticated ? "/menu" : "/"} />} />
      </Routes>
    </Router>
  );
};

export default App;
