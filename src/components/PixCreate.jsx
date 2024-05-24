import React, { useState } from 'react';
import api from '../hooks/Api';

const PixCreate = () => {
  const [chargeResponse, setChargeResponse] = useState(null);
  const [formData, setFormData] = useState({
    chave: '',
    valor: '',
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/pix', formData);
      setChargeResponse(response.data);
    } catch (error) {
      console.error('Error creating Pix charge', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Chave Pix:
          <input type="text" name="chave" value={formData.chave} onChange={handleInputChange} />
        </label>
        <label>
          Valor:
          <input type="text" name="valor" value={formData.valor} onChange={handleInputChange} />
        </label>
        <button type="submit">Criar Cobrança Pix</button>
      </form>
      {chargeResponse && (
        <div>
          <p>ID da Cobrança: {chargeResponse.loc.id}</p>
          {chargeResponse.imagemQrcode && (
            <img src={`data:image/png;base64,${chargeResponse.imagemQrcode}`} alt="QR Code" />
          )}
        </div>
      )}
    </div>
  );
};

export default PixCreate;