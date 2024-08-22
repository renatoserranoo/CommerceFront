import { useState, useEffect } from "react";
import axios from "axios";

const useDataProducts = (id) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/v1/products/${id}`
        );
        setProduct(response.data);
      } catch (error) {
        setError("Failed to load product details");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [id]);

  return { product, loading, error };
};

export default useDataProducts;
