import React, { useState } from 'react';
import api from '../../api/Api';
import copiar from '../../assets/copiar.png'
import './Pix.css'

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

  const handleCopy = () => {
    navigator.clipboard.writeText(chargeResponse.pixCopiaECola)
      .then(() => {
        alert('Pix Copia e Cola copiado com sucesso!');
      })
      .catch(err => {
        console.error('Erro ao copiar Pix Copia e Cola', err);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className='textfield'>
          <label>
            Chave Pix:
          </label>
          <input type="text" name="chave" value={formData.chave} onChange={handleInputChange} />
        </div>
        <div className='textfield'>
          <label>
            Valor:
          </label>
          <input type="text" name="valor" value={formData.valor} onChange={handleInputChange} />
        </div>
        <button type="submit" className='btn-login'>Finalizar Compra</button>
      </form>
      {chargeResponse && (
        <div>
          <p>ID da Cobrança: {chargeResponse.loc.id}</p>
          {chargeResponse.imagemQrcode && (
            <img src={`data:image/png;base64,${chargeResponse.imagemQrcode}`} alt="QR Code" />
          )}
          <div className='copy'>
            <textarea readOnly value={chargeResponse.pixCopiaECola} />
            <button onClick={handleCopy} className='btn-icon'><img src={copiar} alt="copyicon" className='copy-icon'/></button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PixCreate;