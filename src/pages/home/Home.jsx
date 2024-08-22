import React from "react";
import { useState, useEffect } from "react";
import { Card } from "../../components/card/Card";
import banner from "../../assets/banner.png";
import "./Home.css";
import axios from "axios";

const Home = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/v1/products"
        );
        setData(response.data);
      } catch (error) {
        console.error(error); // Log do erro no console

        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="load">
        <div className="spinner"></div>
      </div>
    );
  }

  if (error) {
    return <div className="home-error">Error: {error}</div>;
  }

  return (
    <div className="container">
      <img src={banner} alt="" className="banner" />
      <b id="product-section">Todos Produtos</b>
      <div className="card-grid">
        {data?.map((productData) => (
          <Card
            key={productData.id}
            id={productData.id}
            price={productData.price}
            title={productData.title}
            image={productData.image}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
