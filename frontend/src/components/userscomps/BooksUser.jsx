// import "../../App.scss";
import Search from "../Search";
import "./BooksUser.scss";
import BookUser from "./BookUser";
import { useSelector } from "react-redux";

const BooksUser = ({ list }) => {
  console.log("list type", typeof list);
  const products = useSelector((state) => state.product);
  console.log("products", typeof products.products);
  return (
    <>
      <ul
        // className="d-flex mt-1"
        // style={{
        //   flexWrap: "wrap",
        //   gap: 30,
        // }}
        className="books-container"
      >
        {list && list.length > 0 && list.map((item) => (
          <BookUser key={item._id} book={item} />
        ))}
      </ul>
      <div className="mt-1"></div>
    </>
  );
};

export default BooksUser;
