import React from "react";

import Categories from "../components/Categories";
import Sort, { list } from "../components/Sort";
import Placeholder from "../components/PizzaBlock/Placeholder";
import PizzaBlock from "../components/PizzaBlock";
import Pagination from "../components/Pagination";
import { useDispatch, useSelector } from "react-redux";
import qs from "qs";
import { Link, useNavigate } from "react-router-dom";
import { filterSelector, setFilters } from "../redux/slices/filterSlice";
import { fetchPizzas, pizzaDataSelector } from "../redux/slices/pizzaSlice";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const { status, items } = useSelector(pizzaDataSelector);
  const { categoryId, sort, pageCount, search } = useSelector(filterSelector);

  const category = categoryId > 0 ? `category=${categoryId}` : "";
  const order = sort.sortProperty.includes("-") ? "asc" : "desc";
  const sortBy = sort.sortProperty.replace("-", "");
  const searched = search ? `&search=${search}` : "";

  const getPizzas = async () => {
    dispatch(
      //@ts-ignore
      fetchPizzas({
        category,
        sortBy,
        order,
        searched,
        pageCount,
      })
    );
  };

  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = list.find((obj) => obj.sortProperty === params.sortProperty);

      dispatch(
        setFilters({
          ...params,
          sort,
        })
      );
      isSearch.current = true;
    }
  }, []);

  React.useEffect(() => {
    window.scrollTo(0, 0);
    if (!isSearch.current) {
      getPizzas();
    }
    isSearch.current = false;
  }, [categoryId, sort, search, pageCount]);

  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        pageCount,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sort.sortProperty, pageCount]);

  const skeleton = [...new Array(4)].map((_, index) => (
    <Placeholder key={index} />
  ));
  const pizzas = items.map((obj: any) => (
    <Link to={`/pizza/${obj.id}`} key={obj.id}>
      <PizzaBlock {...obj} />
    </Link>
  ));

  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === "error" ? (
        <div className="content__error-info">
          <h2>Произошла ошибка</h2>
          <p>
            К сожалению не удалось получить данные. Повторите запрос позже :)
          </p>
        </div>
      ) : (
        <div className="content__items">
          {status === "loading" ? skeleton : pizzas}
        </div>
      )}
      <Pagination />
    </div>
  );
};

export default Home;
