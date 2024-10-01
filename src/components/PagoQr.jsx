// PagoQR.jsx
import React from 'react';
import '../components/Styles/PagoQR.css'; // Importar el archivo CSS

const PagoQR = () => {
  return (
    <div className="pago-qr-container">
      <div className="pago-qr-card">
        <h2>Pagar con QR</h2>
        <p>Aquí iría el código QR para escanear con tu app de pagos.</p>
        {/* Reemplaza "ruta_a_tu_imagen_qr.png" con la ruta real de tu imagen QR */}
        <img src="/WhatsApp Image 2024-09-27 at 4.23.15 PM.jpeg" alt="Código QR" className="qr-imagen" />
      </div>
    </div>
  );
};

export default PagoQR;
