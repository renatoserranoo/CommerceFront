import "./ProductPage.css";
import useDataProducts from "../../hooks/useDataProducts";
import cart from "../../assets/cart.png";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../../contexts/CartContext";
import Load from "../../components/load/Load";

const ProductPage = () => {
  const { id } = useParams();
  const { product, loading, error } = useDataProducts(id);
  const { addToCart } = useContext(CartContext);

  if (loading) {
    return (
      <div className="load-home">
        <Load isLoading={loading} />
      </div>
    );
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  const handleAddToCart = () => {
    addToCart(product.id, 1);
  };

  return (
    <div className="product-container">
      <div className="product-title">
        <h4>{product.title}</h4>
        <h6>- {product.category}</h6>
      </div>
      <div className="product-page">
        <div className="product-image">
          <img src={product.image} alt={product.title} />
        </div>
        <div className="product-details">
          <h3 className="product-price">R${product.price}</h3>
          <button className="add-to-cart" onClick={handleAddToCart}>
            <img src={cart} alt="" id="cart-image" />
            Comprar
          </button>
          <b>
            <p className="product-description">{product.description}</p>
          </b>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
