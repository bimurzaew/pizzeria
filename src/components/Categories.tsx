import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { categorySelector } from "../redux/filter/selectors";
import { setCategoryId } from "../redux/filter/slice";

const categories = [
  "Все",
  "Мясные",
  "Вегетарианская",
  "Гриль",
  "Острые",
  "Закрытые",
];

const Categories: React.FC = () => {
  const dispatch = useDispatch();
  const categoryId = useSelector(categorySelector);

  const handleActiveCategory = (index: number) => {
    dispatch(setCategoryId(index));
  };

  return (
    <div className="categories">
      <ul>
        {categories.map((category, index) => {
          return (
            <li
              key={index}
              className={categoryId === index ? "active" : ""}
              onClick={() => handleActiveCategory(index)}
            >
              {category}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default React.memo(Categories);
