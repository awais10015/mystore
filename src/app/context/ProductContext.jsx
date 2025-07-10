"use client";
import React, { createContext, useContext, useState, useMemo } from "react";
import {productsData} from "@/app/context/data/products"; 

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null); 

  const filteredProducts = useMemo(() => {
    return productsData.filter((product) => {
      const categoryMatch = selectedCategory
        ? product.category.includes(selectedCategory)
        : true;

      const priceMatch = maxPrice
        ? parseInt(product.price) <= maxPrice
        : true;

      return categoryMatch && priceMatch;
    });
  }, [selectedCategory, maxPrice]);

  return (
    <ProductContext.Provider
      value={{
        allProducts: productsData,
        filteredProducts,
        selectedCategory,
        setSelectedCategory,
        maxPrice,
        setMaxPrice,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => useContext(ProductContext);
