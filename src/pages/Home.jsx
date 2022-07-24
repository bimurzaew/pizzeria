import React from "react";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Placeholder from "../components/PizzaBlock/Placeholder";
import PizzaBlock from "../components/PizzaBlock";

const Home = () => {
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    fetch("https://62dd52efccdf9f7ec2c4e0b8.mockapi.io/items")
      .then((res) => res.json())
      .then((arr) => {
        setItems(arr);
        setIsLoading(false);
      });
  }, []);
  return (
    <>
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(6)].map((_, index) => <Placeholder key={index} />)
          : items.map((obj) => <PizzaBlock {...obj} key={obj.id} />)}
      </div>
    </>
  );
};

export default Home;
