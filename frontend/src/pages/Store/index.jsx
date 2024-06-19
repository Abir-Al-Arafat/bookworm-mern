import { useState } from "react";
import "../../App.scss";
import Button from "../../components/button/Button";
import Books from "../../components/Books";
import useProducts from "../../hooks/useProducts";
import { currenciesDB } from "../../database/currenciesDB";
import { CurrencyContext } from "../../context/currencies-context";
import AddButton from "../../components/button/AddButton";
import RegistrationButton from "../../components/RegistrationButton";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getAllProducts } from "../../store/slices/product/productSlice";
import { useEffect } from "react";
import BookUser from "../../components/userscomps/BookUser";
import Book from "../../components/Book";
import AdminHeader from "../../components/adminPanel/AdminHeader";

const Store = () => {
  const [currency, setCurrency] = useState(currenciesDB.Euro);
  const [pagination, setPagination] = useState({ page: 1, limit: 10 });
  const [searchParams, setSearchParams] = useSearchParams();
  const { products, error, setProducts, setError, getProducts } = useProducts({
    page: searchParams.get("page") ?? pagination.page,
    limit: searchParams.get("limit") ?? pagination.limit,
  });

  const authSelector = useSelector((state) => state.auth.auth);
  // console.log(authSelector);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProducts(products));
  }, [dispatch, products]);

  const handleAddBook = () => {
    navigate("/addbook");
  };

  return (
    <CurrencyContext.Provider value={currency}>
      <div className="container p-1">
        <AdminHeader />
        {/* <h4 className="mb-1">Change Currency</h4> */}
        <h4 className="mb-1">You are logged in as {authSelector.user.name}</h4>
        {Object.values(currenciesDB).map((cur) => (
          <Button
            key={cur.label}
            text={cur.code}
            className="btn-primary btn-sm"
            onClick={() => setCurrency(cur)}
            // onClick={() => handleCurrencyChange}
          />
        ))}
        <header className="text-center my-4">
          <h1 className="title">Book Store</h1>
          {/* <h2 className="text-uppercase mb-2">Welcome to the Book Store</h2>
          <p className="mx-2">Buy your favourite books!</p> */}
        </header>
        <AddButton
          className="btn-primary"
          text={"Add Book"}
          onClick={handleAddBook}
        />
        {/* <RegistrationButton className="btn-primary" text={"Register"} /> */}
        <button
          className="btn btn-danger"
          onClick={() => {
            if (pagination.page > 1) {
              setPagination((prevState) => ({
                ...prevState,
                page: prevState.page - 1,
              }));
            }
          }}
        >
          Prev
        </button>
        <button
          className="btn-primary"
          onClick={() => {
            if (pagination.page !== products.totalPages) {
              setPagination((prevState) => ({
                ...prevState,
                page: prevState.page + 1,
              }));
            }
          }}
        >
          Next
        </button>
        <ul
          className="d-flex mt-1"
          style={{
              flexWrap: "wrap",
              gap: 30,
          }}
        >
        {products &&
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
          )}
          </ul>

        {/* <Books list={products?.products} /> */}
      </div>
    </CurrencyContext.Provider>
  );
};

export default Store;
