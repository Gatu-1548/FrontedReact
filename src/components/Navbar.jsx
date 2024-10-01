// import React, { useEffect, useState } from 'react'; 
// import { Link, useNavigate } from 'react-router-dom';
// import '../components/Styles/Navbar.css'; 

// const Navbar = ({ onLogout }) => {
//   const navigate = useNavigate();
//   const [roles, setRoles] = useState([]);

//   const handleLogout = (e) => {
//     e.preventDefault();
//     localStorage.removeItem('token');
//     localStorage.removeItem('roles');
//     onLogout();
//     navigate('/login');
//   };

//   useEffect(() => {
//     const storedRoles = JSON.parse(localStorage.getItem('roles')); 
//     if (storedRoles) {
//       setRoles(storedRoles);
//     }
//   }, []);

//   return (
//     <nav className="navbar">
//       <h2 className="navbar-logo">Style Store</h2>
//       <ul className="navbar-links">
//         <li><Link to="/">Inicio</Link></li>
//         <li><Link to="/perfil">Perfil</Link></li>
//         {/* <li><Link to="/servicios">Servicios</Link></li> */}
//         <li><Link to="/carritodecompras">Carrito</Link></li>

//         <li className="productos-dropdown">
//           <Link to="#">Catálogo</Link>
//           <ul className="dropdown-menu">
//             <li><Link to="/productolist">Ver Catálogo de Prendas</Link></li>
//             {(roles.includes('ROLE_ADMIN') || roles.includes('ROLE_ADMIN_DE_PRODUCTOS')) && (
//               <li><Link to="/crear-producto">Crear Prenda</Link></li>
//             )}
//           </ul>
//         </li>

//         {/* Menú de Categorías */}
//         <li className="productos-dropdown">
//           <Link to="#">Categorías</Link>
//           <ul className="dropdown-menu">
//             {(roles.includes('ROLE_ADMIN') || roles.includes('ROLE_ADMIN_DE_PRODUCTOS')) && (
//               <>
//                 <li><Link to="/crearcategoria">Crear Categoría</Link></li>
//                 <li><Link to="/asignarproductoscategoria">Asignar Productos a Categoría</Link></li>
//               </>
//             )}
//           </ul>
//         </li>

//         {roles.includes('ROLE_ADMIN') && (
//           <li><Link to="/usuarios">Usuarios</Link></li>
//         )}

//         <li><Link to="/logout" onClick={handleLogout}>Cerrar Sesión</Link></li>
//       </ul>
//     </nav>
//   );
// };

// export default Navbar;



import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../components/Styles/Navbar.css';
//import logo from '../images/logo.png'; // Asegúrate de que la ruta sea correcta

const Navbar = ({ onLogout }) => {
  const navigate = useNavigate();
  const [roles, setRoles] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false); // Estado para controlar el menú hamburguesa
  const [dropdownOpen, setDropdownOpen] = useState({}); // Estado para manejar submenús

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem('token');
    localStorage.removeItem('roles');
    onLogout();
    navigate('/login');
  };

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleDropdown = (menu) => {
    setDropdownOpen((prevState) => ({
      ...prevState,
      [menu]: !prevState[menu],
    }));
  };

  useEffect(() => {
    const storedRoles = JSON.parse(localStorage.getItem('roles'));
    if (storedRoles) {
      setRoles(storedRoles);
    }
  }, []);

  return (
    <nav className={`navbar ${menuOpen ? 'active' : ''}`}>
      {/* Coloca el logo con la imagen */}
      <div className="navbar-logo">
  <img src="/images/logo.png" alt="Logo de Style Store" className="navbar-logo-image" />
  <h2>Style Store</h2>
</div>
      
      {/* Botón de menú hamburguesa */}
      <button className="menu-toggle" onClick={handleMenuToggle}>
        &#9776; {/* Símbolo de menú hamburguesa */}
      </button>
      
      {/* Lista de enlaces del navbar */}
      <ul className="navbar-links">
        <li><Link to="/">Inicio</Link></li>
        <li><Link to="/perfil">Perfil Usuario</Link></li>
        <li><Link to="/carritodecompras">Carrito de Compras</Link></li>

        {/* Menú de Catálogo */}
        <li
          className={`productos-dropdown ${dropdownOpen['catalogo'] ? 'active' : ''}`}
          onClick={() => toggleDropdown('catalogo')}
        >
          <Link to="#">Catálogo</Link>
          <ul className="dropdown-menu">
            <li><Link to="/productolist">Mostrar Catálogo de Prendas</Link></li>
            {(roles.includes('ROLE_ADMIN') || roles.includes('ROLE_ADMIN_DE_PRODUCTOS')) && (
              <li><Link to="/crear-producto">Añadir Prenda</Link></li>
            )}
          </ul>
        </li>

        {/* Menú de Categorías */}
        <li
          className={`productos-dropdown ${dropdownOpen['categorias'] ? 'active' : ''}`}
          onClick={() => toggleDropdown('categorias')}
        >
          <Link to="#">Categorías</Link>
          <ul className="dropdown-menu">
            {/* Mostrar solo la vista de 'Productos por Categoría' si el rol es 'ROLE_USER' */}
            {roles.includes('ROLE_USER') && (
              <li><Link to="/productosporcategoria"> Productos por Categoría</Link></li>
            )}
            {/* Mostrar todas las opciones si el rol es 'ROLE_ADMIN' o 'ROLE_ADMIN_DE_PRODUCTOS' */}
            {(roles.includes('ROLE_ADMIN') || roles.includes('ROLE_ADMIN_DE_PRODUCTOS')) && (
              <>
                <li><Link to="/crearcategoria">Añadir Categoría</Link></li>
                <li><Link to="/asignarproductoscategoria">Asignar Productos a Categoría</Link></li>
                <li><Link to="/productosporcategoria">Mostrar Productos por Categoría</Link></li>
              </>
            )}
          </ul>
        </li>

        {roles.includes('ROLE_ADMIN') && (
          <>
            <li><Link to="/usuarios">Lista Usuarios</Link></li>
          </>
        )}

        <li><Link to="/logout" onClick={handleLogout}>Cerrar Sesión</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
