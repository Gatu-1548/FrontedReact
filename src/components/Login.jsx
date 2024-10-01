// // src/Login.jsx
// import React, { useState } from 'react';
// import axios from 'axios';

// const Login = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('http://localhost:8080/api/login', {
//         username,
//         password,
//       });
//       // Suponiendo que tu API devuelve un token en caso de éxito
//       localStorage.setItem('token', response.data.token);
//       // Redirigir o hacer algo después del login exitoso
//     } catch (err) {
//       setError('Credenciales incorrectas. Intenta nuevamente.');
//     }
//   };

//   return (
//     <div>
//       <h2>Iniciar Sesión</h2>
//       {error && <p style={{ color: 'red' }}>{error}</p>}
//       <form onSubmit={handleLogin}>
//         <div>
//           <label>Usuario:</label>
//           <input
//             type="text"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <label>Contraseña:</label>
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         </div>
//         <button type="submit">Iniciar Sesión</button>
//       </form>
//     </div>
//   );
// };

// export default Login;


// src/Login.jsx
// src/Login.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../components/Styles/Login.css';

const Login = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/login', {
        username,
        password,
      });

      if (response.data.token) {
        // Guardar el token y los roles en el almacenamiento local
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('roles', JSON.stringify(response.data.roles));

        // Actualizar el estado de autenticación en el componente principal
        onLoginSuccess();

        // Redirigir al menú
        navigate('/menu');
      } else {
        setError('Credenciales incorrectas. Intenta nuevamente.');
      }
    } catch (err) {
      setError('Credenciales incorrectas. Intenta nuevamente.');
    }
  };

  const handleRegisterRedirect = () => {
    navigate('/register'); // Redirige al usuario a la página de registro
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Iniciar Sesión</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleLogin}>
          <div>
            <label>Usuario:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Contraseña:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Iniciar Sesión</button>
        </form>
        <div className="register-section">
          <p>¿No tienes una cuenta?</p>
          <button onClick={handleRegisterRedirect}>Registrarse</button>
        </div>
      </div>
    </div>
  );
};

export default Login;

