import { useEffect, useState } from "react";
import { CanceledError } from "../services/api-client";
import productService from "../services/product-service";

const useProducts = ({ page, limit, search, sort, filter }) => {
  const [products, setProducts] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const { request, cancel } = productService.getAll(
      `getall?page=${page}&limit=${limit}${search ? `&search=${search}` : ``}${
        sort && sort.param ? `&sortParam=${sort.param}` : ""
      }${sort && sort.order ? `&sortOrder=${sort.order}` : ""}${filter && filter.price ? `&price=${filter.price}` : ""}${
        filter && filter.priceFil ? `&priceFil=${filter.priceFil}` : ""
      }`
    );
    request
      .then((res) => {
        console.log(res.data.data);
        setProducts(res.data.data);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
        console.log(err);
      });

    return () => cancel();
  }, [page, limit, search, sort, filter]);

  return { products, error, setProducts, setError };
};

export default useProducts;

// --------------- prev code --------------------
// import { useEffect, useState } from "react";
// import { CanceledError } from "../services/api-client";
// import productService from "../services/product-service";

// const useProducts = () => {
//   const [products, setProducts] = useState([]);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const { request, cancel } = productService.getAll("getall");
//     request
//       .then((res) => {
//         // console.log(res.data.data.products);
//         setProducts(res.data.data.products);
//       })
//       .catch((err) => {
//         if (err instanceof CanceledError) return;
//         setError(err.message);
//       });

//     return () => cancel();
//   }, []);

//   return { products, error, setProducts, setError };
// };

// export default useProducts;
