import React, { useState, useContext, useEffect } from 'react';
import api from '../../api/Api';
import { CartContext } from '../../contexts/CartContext';
import copiar from '../../assets/copiar.png';
import './Pix.css';

const PixCreate = () => {
  const { cartItems } = useContext(CartContext); // Obtenha os itens do carrinho
  const [chargeResponse, setChargeResponse] = useState(null);
  
  const chavePix = 'fca43fd4-e044-44af-aa2e-334dc77e0651'; // Defina sua chave Pix fixa aqui

  // Calcule o valor total do carrinho
  const totalCartValue = cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0).toFixed(2);

  useEffect(() => {
    if (totalCartValue > 0) {
      handleSubmit(); // Gere o pagamento automaticamente ao carregar a página, se o valor for maior que zero
    }
  }, [totalCartValue]);

  const handleSubmit = async () => {
    try {
      const response = await api.post('/pix', {
        chave: chavePix,
        valor: totalCartValue,
      });
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
    <div className='pay'>
      {chargeResponse && (
        <div>
          <p>ID da Cobrança: {chargeResponse.loc.id}</p>
          {chargeResponse.imagemQrcode && (
            <img src={`data:image/png;base64,${chargeResponse.imagemQrcode}`} alt="QR Code" />
          )}
          <div className='copy'>
            <textarea readOnly value={chargeResponse.pixCopiaECola} />
            <button onClick={handleCopy} className='btn-icon'>
              <img src={copiar} alt="copyicon" className='copy-icon'/>
            </button>
          </div>
          <b>Abra o Aplicativo do seu banco para ler o QR Code ou copie o código</b>
        </div>
      )}
    </div>
  );
};

export default PixCreate;
