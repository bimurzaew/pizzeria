import React from "react";
import qs from "qs";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Categories from "../components/Categories";
import Sort, { list } from "../components/Sort";
import Placeholder from "../components/PizzaBlock/Placeholder";
import PizzaBlock from "../components/PizzaBlock";
import Pagination from "../components/Pagination";
import { fetchPizzas } from "../redux/pizza/thunks";
import { useAppDispatch } from "../redux/store";
import { pizzaDataSelector } from "../redux/pizza/selectors";
import { filterSelector } from "../redux/filter/selectors";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
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
      fetchPizzas({
        category,
        sortBy,
        order,
        searched,
        pageCount: String(pageCount),
      })
    );
  };

  // React.useEffect(() => {
  //   if (window.location.search) {
  //     const params = qs.parse(window.location.search.substring(1));
  //     const sort = list.find((obj) => obj.sortProperty === params.sortProperty);
  //     dispatch(
  //       setFilters({
  //         // @ts-ignore
  //         search: params.search,
  //         categoryId: Number(params.category),
  //         pageCount: Number(params.currentPage),
  //         // @ts-ignore
  //         sort: sort || list[0],
  //       })
  //     );
  //     isSearch.current = true;
  //   }
  // }, []);

  React.useEffect(() => {
    getPizzas();
  }, [categoryId, sort, search, pageCount]);

  // React.useEffect(() => {
  //   if (isMounted.current) {
  //     const queryString = qs.stringify({
  //       sortProperty: sort.sortProperty,
  //       categoryId,
  //       pageCount,
  //     });
  //     navigate(`?${queryString}`);
  //   }
  //   isMounted.current = true;
  // }, [categoryId, sort.sortProperty, pageCount]);

  const skeleton = [...new Array(4)].map((_, index) => (
    <Placeholder key={index} />
  ));
  const pizzas = items.map((obj: any) => <PizzaBlock {...obj} key={obj.id} />);

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
