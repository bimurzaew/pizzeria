import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const FullPizza: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pizza, setPizza] = useState<{
    title: string;
    price: number;
    description: string;
    imageUrl: string;
  }>();

  React.useEffect(() => {
    async function fetchPizza() {
      try {
        const res = await axios.get(
          `https://62dd52efccdf9f7ec2c4e0b8.mockapi.io/items/${id}`
        );
        setPizza(res.data);
      } catch (e) {
        alert("Не удалось получить данные");
        navigate("/");
      }
    }
    fetchPizza();
  }, []);

  if (!pizza) {
    return <>...загрузка</>;
  }

  return (
    <div className="container container__pizza">
      <h2>Пицца {pizza.title}</h2>
      <img src={pizza.imageUrl} alt="" />
      <p>Цена: {pizza.price}р</p>
      <span>{pizza.description}</span>
      <div className="cart__bottom-buttons">
        <Link to="/" className="button button--outline button--add go-back-btn">
          <svg
            width="8"
            height="14"
            viewBox="0 0 8 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7 13L1 6.93015L6.86175 1"
              stroke="#D3D3D3"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span>Вернуться назад</span>
        </Link>
      </div>
    </div>
  );
};

export default FullPizza;
