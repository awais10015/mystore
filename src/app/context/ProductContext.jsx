"use client";

import { createContext, useContext, useEffect, useState } from "react";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        const list = res.ok && Array.isArray(data) ? data : [];
        if (!res.ok) {
          console.error("Failed to load products:", data);
        }
        setProducts(list);
        setFilteredProducts(list);
      } catch (err) {
        console.error("Failed to load products:", err);
        setProducts([]);
        setFilteredProducts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    if (!Array.isArray(products)) {
      setFilteredProducts([]);
      return;
    }

    let filtered = [...products];

    if (selectedCategory) {
      filtered = filtered.filter((product) =>
        product.category.includes(selectedCategory)
      );
    }

    if (maxPrice) {
      filtered = filtered.filter(
        (product) => parseFloat(product.price) <= maxPrice
      );
    }

    setFilteredProducts(filtered);
  }, [selectedCategory, maxPrice, products]);

  return (
    <ProductContext.Provider
      value={{
        products,
        filteredProducts,
        setSelectedCategory,
        setMaxPrice,
        loading,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => useContext(ProductContext);
