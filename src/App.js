import React from "react";
import { useSelector, useDispatch } from "react-redux";
import "./App.css";
import {
  loadCategories,
  setLoading,
  selectCategories,
  selectIsLoading,
  setCategories,
  addCategory,
  removeCategory,
  toggleCategory,
} from "./slices/categoriesSlice";
import { useEffect } from "react";
import Categories from "./Categories";
import Products from "./Products";

const __images = [
  "/static-assets/products/1010.jpg",
  "/static-assets/products/1012.jpg",
  "/static-assets/products/1030.jpg",
  "/static-assets/products/1120.jpg",
  "/static-assets/products/1002.jpg",
  "/static-assets/products/1003.jpg",
  "/static-assets/products/1004.jpg",
  "/static-assets/products/1005.jpg",
  "/static-assets/products/1006.jpg",
];

const categoryProductsUrl = process.env.REACT_APP_PRODUCTS_URL;

function App() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const categories = useSelector(selectCategories);

  useEffect(() => {
    fetch(categoryProductsUrl)
      .then((response) => response.json())

      // Adding IDs, since none are present and random images for each product
      .then((categories) =>
        categories.map((category) => ({
          ...category,
          id: category.title.toLowerCase().trim().split(/\s+/g).join("-"),
          data: category.data.map((product) => ({
            ...product,
            image: __images[Math.floor(Math.random() * __images.length)],
          })),
        }))
      )
      .then((categories) => {
        console.log("got categories", categories);
        dispatch(setCategories(categories));
        dispatch(setLoading(false));
        console.log("set categories??");
        dispatch(toggleCategory(categories[0].id));
      });
  }, []);

  useEffect(() => {
    console.log("App categories", categories);
  }, [categories]);

  useEffect(() => {
    console.log("App loading", isLoading);
  }, [isLoading]);

  return (
    <div className="App">
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="App__content">
          <div className="App__sidebar">
            <Categories />
          </div>

          <div className="App__main">
            <Products />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
