// SeleccionarPago.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../components/Styles/SeleccionarPago.css'; // Importar el archivo CSS

const SeleccionarPago = () => {
  const navigate = useNavigate();

  const handlePago = (metodo) => {
    if (metodo === 'stripe') {
      window.open('https://buy.stripe.com/test_00g8Af2Imh0p7q8288', '_blank');
    } else if (metodo === 'qr') {
      navigate('/pago-qr');
    } else if (metodo === 'efectivo') {
      navigate('/pago-efectivo');
    }
  };

  return (
    <div className="seleccionar-pago-container">
      <h2>Selecciona un Método de Pago</h2>
      <div className="botones-pago">
        <button className="boton-pago" onClick={() => handlePago('efectivo')}>
          Pago en Efectivo
        </button>
        <button className="boton-pago" onClick={() => handlePago('qr')}>
          Pago por QR
        </button>
        <button className="boton-pago" onClick={() => handlePago('stripe')}>
          Pago por Stripe
        </button>
      </div>
    </div>
  );
};

export default SeleccionarPago;
