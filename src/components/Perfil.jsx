import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import '../components/Styles/Perfil.css'; // Asegúrate de crear este archivo CSS

const Perfil = () => {
  const [userData, setUserData] = useState({ fullName: '', email: '' });
  const [passwords, setPasswords] = useState({ oldPassword: '', newPassword: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Usuario no autenticado',
        });
        navigate('/login');
        return;
      }

      try {
        const response = await axios.get('http://localhost:8080/api/users/perfil', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUserData(response.data);
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error al obtener los datos del usuario',
        });
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleInputChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.put('http://localhost:8080/api/users/perfil', userData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      Swal.fire({
        icon: 'success',
        title: 'Éxito',
        text: 'Perfil actualizado exitosamente',
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Error al actualizar el perfil',
      });
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.put('http://localhost:8080/api/users/perfil/cambiar-contraseña', passwords, {
        headers: { Authorization: `Bearer ${token}` }
      });
      Swal.fire({
        icon: 'success',
        title: 'Éxito',
        text: 'Contraseña actualizada exitosamente',
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Error al cambiar la contraseña',
      });
    }
  };

  return (
    <div className="profile-container">
      <h2>Perfil del Usuario</h2>
      <form className="profile-form" onSubmit={handleProfileUpdate}>
        <label>Nombre:</label>
        <input
          type="text"
          name="fullName"
          value={userData.fullName}
          onChange={handleInputChange}
          required
        />
        <label>Correo electrónico:</label>
        <input
          type="email"
          name="email"
          value={userData.email}
          onChange={handleInputChange}
          required
        />
        <button type="submit" className="btn">Actualizar Perfil</button>
      </form>
      <br />
      <h3>Cambiar Contraseña</h3>
      <form className="password-form" onSubmit={handlePasswordChange}>
        <label>Contraseña actual:</label>
        <input
          type="password"
          name="oldPassword"
          value={passwords.oldPassword}
          onChange={(e) => setPasswords({ ...passwords, oldPassword: e.target.value })}
          required
        />
        <label>Nueva contraseña:</label>
        <input
          type="password"
          name="newPassword"
          value={passwords.newPassword}
          onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
          required
        />
        <button type="submit" className="btn">Cambiar Contraseña</button>
      </form>
    </div>
  );
};

export default Perfil;
