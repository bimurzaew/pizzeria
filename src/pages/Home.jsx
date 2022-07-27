import React from "react";

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Placeholder from "../components/PizzaBlock/Placeholder";
import PizzaBlock from "../components/PizzaBlock";
import Pagination from "../components/Pagination";
import { SearchContext } from "../App";
import { useSelector } from "react-redux";

const Home = () => {
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [currentPage, setCurrentPage] = React.useState(1);

  const { searchValue } = React.useContext(SearchContext);
  const { categoryId, sort } = useSelector((state) => state.filter);

  const category = categoryId > 0 ? `category=${categoryId}` : "";
  const order = sort.sortProperty.includes("-") ? "asc" : "desc";
  const sortBy = sort.sortProperty.replace("-", "");
  const search = searchValue ? `&search=${searchValue}` : "";

  React.useEffect(() => {
    setIsLoading(true);
    fetch(
      `https://62dd52efccdf9f7ec2c4e0b8.mockapi.io/items?${category}&sortBy=${sortBy}&order=${order}${search}&page=${currentPage}&limit=4`
    )
      .then((res) => res.json())
      .then((arr) => {
        setItems(arr);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categoryId, sort, searchValue, currentPage]);

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
      <Pagination onChangePage={(number) => setCurrentPage(number)} />
    </div>
  );
};

export default Home;
