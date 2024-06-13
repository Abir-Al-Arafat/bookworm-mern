import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "./button/Button";
import { CurrencyContext } from "../context/currencies-context";
import "../App.scss";
import { Link, Navigate } from "react-router-dom";
import { coursesDB } from "../database/coursesDB";
import { useSelector, useDispatch } from "react-redux";

const Book = ({ book }) => {
  const tasks = useSelector((state) => state.books);
  console.log("books", tasks);
  const currency = React.useContext(CurrencyContext);
  //   console.log("course item", course);
  const { name, author, description, price } = book;

  console.log("coursesDB", coursesDB[0].img);

  const [isDeleted, setIsDeleted] = useState(false);

  const contextPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency.code,
  }).format(price * currency.conversionRate);

  //   change course bg
  const [courseBg, setCourseBg] = useState();

  useEffect(() => {
    if (currency.code === "USD") {
      setCourseBg("card-light");
    }
    if (currency.code === "EUR") {
      setCourseBg("card-primary");
    }
    if (currency.code === "GBP") {
      setCourseBg("card-danger");
    }
  }, [currency.code]);

  const handleDelete = (e) => {
    e.preventDefault();

    axios
      .delete(`http://127.0.0.1:3000/products/${book._id}`)
      .then((response) => {
        console.log("Book deleted:", response.data);
        if (response.data.success) {
          setIsDeleted(true);
          //   alert("book added successfully");
        }
      })
      .catch((error) => {
        console.error("Error deleting book:", error);
      });
  };

  if (isDeleted) {
    return <Navigate to="/" />;
  }

  return (
    <li className={`card ${courseBg} mb-1`} style={{ width: 250 }}>
      <div className="card-header">{name}</div>
      <div className="card-sub-header">{author}</div>
      <img src={coursesDB[0].img} alt="course img" style={{ width: "100%" }} />
      {/* <p className="card-body">{description}</p> */}
      <div className="card-footer d-flex space-between">
        <h4>{contextPrice}</h4>
        {/* <Button className="btn-primary" text="BUY" /> */}
      </div>
      <div className="card-footer d-flex justify-content-between mt-1">
        <Link to={`/editbook/${book._id}`}>
          <Button className="btn-primary" text="EDIT" />
        </Link>
        <Button onClick={handleDelete} className="btn btn-danger" text="DELETE" />
      </div>
    </li>
  );
};

export default Book;
