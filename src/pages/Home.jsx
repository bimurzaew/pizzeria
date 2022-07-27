import React from "react";

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Placeholder from "../components/PizzaBlock/Placeholder";
import PizzaBlock from "../components/PizzaBlock";
import Pagination from "../components/Pagination";
import { useSelector } from "react-redux";
import axios from "axios";

const Home = () => {
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const { categoryId, sort, pageCount, search } = useSelector(
    (state) => state.filter
  );

  const category = categoryId > 0 ? `category=${categoryId}` : "";
  const order = sort.sortProperty.includes("-") ? "asc" : "desc";
  const sortBy = sort.sortProperty.replace("-", "");
  const searched = search ? `&search=${search}` : "";

  React.useEffect(() => {
    setIsLoading(true);
    axios
      .get(
        `https://62dd52efccdf9f7ec2c4e0b8.mockapi.io/items?${category}&sortBy=${sortBy}&order=${order}${searched}&page=${pageCount}&limit=4`
      )
      .then((res) => {
        setItems(res.data);
        setIsLoading(false);
      });

    window.scrollTo(0, 0);
  }, [categoryId, sort, search, pageCount]);

  const skeleton = [...new Array(4)].map((_, index) => (
    <Placeholder key={index} />
  ));
  const pizzas = items.map((obj) => <PizzaBlock {...obj} key={obj.id} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeleton : pizzas}</div>
      <Pagination />
    </div>
  );
};

export default Home;
