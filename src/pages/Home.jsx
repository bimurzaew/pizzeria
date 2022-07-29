import React from "react";

import Categories from "../components/Categories";
import Sort, { list } from "../components/Sort";
import Placeholder from "../components/PizzaBlock/Placeholder";
import PizzaBlock from "../components/PizzaBlock";
import Pagination from "../components/Pagination";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import qs from "qs";
import { useNavigate } from "react-router-dom";
import { setFilters } from "../redux/slices/filterSlice";

const Home = () => {
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const { categoryId, sort, pageCount, search } = useSelector(
    (state) => state.filter
  );

  const category = categoryId > 0 ? `category=${categoryId}` : "";
  const order = sort.sortProperty.includes("-") ? "asc" : "desc";
  const sortBy = sort.sortProperty.replace("-", "");
  const searched = search ? `&search=${search}` : "";

  const fetchPizzas = () => {
    setIsLoading(true);
    axios
      .get(
        `https://62dd52efccdf9f7ec2c4e0b8.mockapi.io/items?${category}&sortBy=${sortBy}&order=${order}${searched}&page=${pageCount}&limit=4`
      )
      .then((res) => {
        setItems(res.data);
        setIsLoading(false);
      });
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
      fetchPizzas();
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
