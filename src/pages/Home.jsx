import React, { useEffect, useRef } from "react";
import Categories from "../components/Categories";
import Sort, { list } from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Pagination from "../components/Pagination";
import { useSelector, useDispatch } from "react-redux";
import {
  serCategoryId,
  setCurrentPage,
  setFilters,
} from "../redux/slice/filterSlice";
import axios from "axios";
import qs from "qs";
import { useNavigate } from "react-router-dom";
import { setPizzas, fetchPizzas } from "../redux/slice/pizzasSlice";

export default function Home({ searchValue }) {
  const navigate = useNavigate();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const dispath = useDispatch();
  const { categoryId, currentPage, sortType } = useSelector(
    (state) => state.filter
  );
  const { pizzas } = useSelector((state) => state.pizzas);
  const [order, setOrder] = React.useState(false);

  // const getPizzas = () => {
  //   axios
  //     .get(
  //       `https://65a5775952f07a8b4a3f327d.mockapi.io/items?page=${currentPage}&limit=4&${
  //         categoryId > 0 ? `category=${categoryId}` : ""
  //       }&sortBy=${sortType.sortProperty}&order=${order ? "asc" : "desc"}${
  //         searchValue && `&search=${searchValue}`
  //       }`
  //     )
  //     .then((res) => {
  //       dispath(setPizzas(res.data));
  //       console.log(res.data);
  //     })
  //     .catch((error) => {
  //       console.error("There was a problem with the fetch operation:", error);
  //     });
  // };

  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sortType.sortProperty,
        categoryId,
        currentPage,
      });

      navigate(`?${queryString}`);
    }

    isMounted.current = true;
  }, [categoryId, sortType, order, searchValue, currentPage]);

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      console.log(params);

      const sort = list.find((obj) => obj.sortProperty === params.sortProperty);

      dispath(setFilters({ ...params, sort }));
      isSearch.current = true;
    }
  }, []);

  React.useEffect(() => {
    window.scrollTo(0, 0);
    if (!isSearch.current) {
      dispath(
        fetchPizzas({
          order,
          currentPage,
          sortType,
          searchValue,
          categoryId,
        })
      );
      // getPizzas();
    }

    isSearch.current = false;
  }, [categoryId, sortType, order, searchValue, currentPage]);

  return (
    <>
      <div className="content__top">
        <Categories
          categoryId={categoryId}
          onClickCategory={(id) => dispath(serCategoryId(id))}
        />
        <Sort onClickOrder={setOrder} order={order} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {pizzas.map((pizza, index) => (
          <PizzaBlock
            key={index}
            id={pizza.id}
            title={pizza.title}
            price={pizza.price}
            sizes={pizza.sizes}
            types={pizza.types}
          />
        ))}
      </div>
      <Pagination onChangePage={(number) => dispath(setCurrentPage(number))} />
    </>
  );
}
