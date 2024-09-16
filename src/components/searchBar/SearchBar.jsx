import React, { useEffect, useRef, useState } from "react";
import { debounce } from "lodash";
import axios from "axios";
import { Form, FormControl, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import Load from "../load/Load";
import search from "../../assets/lupa.png";
import "./SearchBar.css";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const searchBarRef = useRef(null);

  const debouncedFetchSuggestions = debounce(async (query) => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        "http://localhost:8080/api/v1/products/search",
        {
          params: { query },
        }
      );
      setSuggestions(response.data);
    } catch (error) {
      console.error("Erro ao buscar sugestões", error);
    } finally {
      setIsLoading(false);
    }
  }, 300);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    if (value.length > 2) {
      debouncedFetchSuggestions(value);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (product) => {
    setSearchTerm(product.title);
    setSuggestions([]);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchBarRef.current && !searchBarRef.current.contains(event.target)) {
        setSuggestions([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={searchBarRef} className="search-bar-container">
      <Form
        className="search-bar"
        style={{ flexDirection: "row", position: "relative" }}
      >
        <FormControl
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          placeholder="Buscar produtos..."
          style={{ width: "100%" }}
        />
        <button type="submit" className="search-button">
          <img src={search} alt="search-icon" id="search-img" />
        </button>
      </Form>
      {suggestions.length > 0 && (
        <ListGroup
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            width: "100%",
            zIndex: 1000,
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        >
          {isLoading && (
            <ListGroup.Item>
              <Load isLoading={isLoading} />
            </ListGroup.Item>
          )}
          {suggestions.map((product) => (
            <Link
              key={product.id}
              to={`/product/${product.id}`}
              style={{ textDecoration: "none" }}
              onClick={() => handleSuggestionClick(product)}
            >
              <ListGroup.Item
                action
                className="product-search"
                style={{ border: "0", fontSize: "15px" }}
              >
                <img src={product.image} />
                {product.title} <b>R${product.price}</b>
              </ListGroup.Item>
            </Link>
          ))}
        </ListGroup>
      )}
    </div>
  );
};

export default SearchBar;
