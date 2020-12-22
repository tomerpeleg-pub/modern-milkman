import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  loadCategories,
  setLoading,
  selectCategories,
  selectIsLoading,
  setCategories,
  selectProducts,
} from "../slices/categoriesSlice";
import { useEffect } from "react";
import styles from "./Products.css";

const Product = ({ amount, price, stock, title, image }) => (
  <article className="Product">
    <img className="Product__image" src={image} alt="" />
    <h1 className="Product__title">{title}</h1>
    <p className="Product__price">
      £{price} {amount}
    </p>
    <p className="Product__stock">
      {stock > 10 ? "In stock" : stock === 0 ? "Out of stock" : "Few left"}
    </p>
    {stock > 0 && (
      <a className="Products__cta" href="#">
        Add to cart
      </a>
    )}
  </article>
);

export default function Products() {
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);
  const products = useSelector(selectProducts);

  return (
    <div>
      {products.length > 0 && <p>Products: {products.length}</p>}

      <div className="Products">
        {!!products.length === false && (
          <p>Please select at least a category message.</p>
        )}
        {products.map &&
          products.map((product, index) => (
            <Product {...product} key={index} />
          ))}
      </div>
    </div>
  );
}
