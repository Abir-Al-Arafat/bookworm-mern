import { useEffect, useState } from "react";
import "../../App.scss";
import Button from "../../components/button/Button";
import useProducts from "../../hooks/useProducts";
import { currenciesDB } from "../../database/currenciesDB";
import { CurrencyContext } from "../../context/currencies-context";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Search from "../../components/Search";
import Layout from "../../components/Layout";
import Book from "../../components/Book";
import "./index.scss";

const Store = () => {
  const [currency, setCurrency] = useState(currenciesDB.Euro);
  const [searchParams, setSearchParams] = useSearchParams();

  const [searchQuery, setSearchQuery] = useState("");
  const [searchInput, setSearchInput] = useState("");

  const [sort, setSort] = useState({ param: "name", order: "asc" });
  const [filter, setFilter] = useState({ price: "0", priceFil: "high" });

  const { products } = useProducts({
    page: searchParams.get("page") ?? 1,
    limit: searchParams.get("limit") ?? 10,
    search: searchInput ? searchInput : "",
    sort: sort,
    filter: filter,
  });
  const auth = useSelector((state) => state.auth.auth);
  useEffect(() => {
    const delayedInput = setTimeout(() => {
      setSearchInput(searchQuery);
      console.log(searchQuery);
    }, 1000);

    return () => clearTimeout(delayedInput);
  }, [searchQuery]);

  const inputHandler = (e) => {
    setSearchQuery(e.target.value);
  };

  console.log(searchQuery);

  return (
    <CurrencyContext.Provider value={currency}>
      <Layout>
        <div className="container p-1">
          {auth && (
            <h4 className="mb-1">You are logged in as {auth?.user.name}</h4>
          )}
          {Object.values(currenciesDB).map((cur) => (
            <Button
              key={cur.label}
              text={cur.code}
              className="btn-primary btn-sm"
              onClick={() => setCurrency(cur)}
            />
          ))}
          <header className="text-center my-4">
            <Search onChange={inputHandler} searchQuery={searchQuery} />
            <div className="sort-container">
              <span>Sort by:</span>
              <select
                name=""
                id=""
                onChange={(e) => {
                  setSort((prevState) => ({
                    ...prevState,
                    param: e.target.value,
                  }));
                }}
              >
                <option value="title">Title</option>
                <option value="price">Price</option>
              </select>
              <div className="sort">
                <input
                  type="radio"
                  name="order"
                  id=""
                  checked={sort.order === "asc"}
                  onChange={(e) => {
                    setSort((prevState) => ({ ...prevState, order: "asc" }));
                  }}
                />
                <span>Ascending</span>
              </div>
              <div className="sort">
                <input
                  type="radio"
                  name="order"
                  id=""
                  checked={sort.order === "desc"}
                  onChange={(e) => {
                    setSort((prevState) => ({ ...prevState, order: "desc" }));
                  }}
                />
                <span>Descending</span>
              </div>
            </div>
            <div className="filter-container">
              <span>Filter by: Price</span>
              <div className="filter-group">
                <input
                  type="radio"
                  name="filter"
                  id=""
                  checked={filter.price === "0" && filter.priceFil === "high"}
                  onChange={(e) => {
                    setFilter({ price: "0", priceFil: "high" });
                  }}
                />
                <span className="filter-price">All</span>
              </div>
              <div className="filter-group">
                <input
                  type="radio"
                  name="filter"
                  id=""
                  checked={filter.price === "15" && filter.priceFil === "high"}
                  onChange={(e) => {
                    setFilter({ price: "15", priceFil: "high" });
                  }}
                />
                <span className="filter-price">{">"} 15.00</span>
              </div>
              <div className="filter-group">
                <input
                  type="radio"
                  name="filter"
                  id=""
                  checked={filter.price === "15" && filter.priceFil === "low"}
                  onChange={(e) => {
                    setFilter({ price: "15", priceFil: "low" });
                  }}
                />
                <span className="filter-price">15.00 {"<="}</span>
              </div>
            </div>
            <div className="books-container">
              {products && products.products && products.products.length > 0 ? (
                products.products.map(
                  ({ _id, name, author, description, price, img }) => {
                    return (
                      <Book
                        key={_id}
                        _id={_id}
                        name={name}
                        author={author}
                        description={description}
                        price={price}
                        img={img}
                      />
                    );
                  }
                )
              ) : (
                <div>No books were found</div>
              )}
            </div>
          </header>

          <div className="pagination-btn-container">
            <button
              className="btn btn-primary"
              onClick={() => {
                if (Number(searchParams.get("page")) > 1) {
                  setSearchParams((prevSearchParams) => {
                    const updatedSearchParams = new URLSearchParams(
                      prevSearchParams
                    );
                    updatedSearchParams.set(
                      "page",
                      String(Number(searchParams.get("page")) - 1)
                    );
                    updatedSearchParams.set("limit", String(10));
                    return updatedSearchParams.toString();
                  });
                }
              }}
            >
              Prev
            </button>
            {Array(products?.totalPages)
              .fill(0)
              .map((element, i) => {
                return (
                  <button
                    className="btn btn-danger"
                    onClick={() => {
                      setSearchParams((prevSearchParams) => {
                        const updatedSearchParams = new URLSearchParams(
                          prevSearchParams
                        );
                        updatedSearchParams.set("page", String(Number(i) + 1));
                        updatedSearchParams.set("limit", String(10));
                        return updatedSearchParams.toString();
                      });
                    }}
                    key={i}
                  >
                    {i + 1}
                  </button>
                );
              })}
            <button
              className="btn btn-primary"
              onClick={() => {
                if (Number(searchParams.get("page")) !== products.totalPages) {
                  setSearchParams((prevSearchParams) => {
                    const updatedSearchParams = new URLSearchParams(
                      prevSearchParams
                    );
                    updatedSearchParams.set(
                      "page",
                      String(Number(searchParams.get("page")) + 1)
                    );
                    updatedSearchParams.set("limit", String(10));
                    return updatedSearchParams.toString();
                  });
                }
              }}
            >
              Next
            </button>
          </div>
        </div>
      </Layout>
    </CurrencyContext.Provider>
  );
};

export default Store;
