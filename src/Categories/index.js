import { useSelector, useDispatch } from "react-redux";
import {
  loadCategories,
  setLoading,
  selectCategories,
  selectIsLoading,
  setCategories,
  toggleCategory,
  clearCategories,
} from "../slices/categoriesSlice";
import { useEffect, useState } from "react";
import styles from "./Categories.css";
import { MdMenu, MdClose } from "react-icons/md";

const Button = ({ selected, children, ...rest }) => (
  <a {...rest} className={"Button " + (rest.className || "")} href="#">
    {children}
  </a>
);

export default function Categories() {
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);
  const [showMenu, setShowMenu] = useState(false);

  return (
    <nav className={`Categories ${showMenu ? "is-menu-open" : ""}`}>
      <button
        className="Categories__toggle"
        onClick={(e) => setShowMenu(!showMenu)}
      >
        {showMenu ? <MdClose /> : <MdMenu />}
      </button>
      <ul className="Categories__list">
        {categories.map &&
          categories?.map((category, index) => (
            <li
              key={index}
              className="Categories__item"
              onClick={(e) => {
                dispatch(toggleCategory(category.id));
              }}
            >
              <Button className={category.selected ? "is-selected" : ""}>
                {category.title}
              </Button>
            </li>
          ))}

        <li>
          <hr />
          <Button onClick={(e) => dispatch(clearCategories())}>Clear</Button>
        </li>
      </ul>
    </nav>
  );
}
