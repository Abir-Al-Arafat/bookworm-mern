import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getOneProduct } from "../../store/slices/product/productSlice";
import { useDispatch } from "react-redux";
import AdminHeader from "../../components/adminPanel/AdminHeader";
import userService from "../../services/user-service";

const EditUser = () => {
  const [user, setUser] = useState();
  const [isUserUpdated, setUserUpdated] = useState(false);

  const [error, setError] = useState("");
  const params = useParams();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    balance: "",
  });

  useEffect(() => {
    const request = userService.getOneById(params.id);
    request
      .then((res) => {
        console.log(res.data);
        setUser(res.data);
        setFormData(res.data);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, []);

  console.log("user", user);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, phone, balance } = formData;

    axios
      .patch(`http://127.0.0.1:3000/products/${user._id}`, {
        name,
        phone,
        balance,
      })
      .then((response) => {
        console.log("User updated:", response.data);
        setUserUpdated(true);
      })
      .catch((error) => {
        console.error("Error updating user:", error);
      });
  };

  console.log("book added", isUserUpdated);

  if (isUserUpdated) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <div className="container">
        <AdminHeader />
      </div>

      {/* {user && <h4 className="mb-1">You are logged in as {user}</h4>} 
      <form
        className="d-flex flex-column form-container"
        onSubmit={handleSubmit}
      >
        <div className="form-group m-1">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name || ""}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group m-1">
          <label htmlFor="author">Phone:</label>
          <input
            type="number"
            id="phone"
            name="phone"
            value={formData.phone || ""}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group m-1">
          <label htmlFor="balance" style={{ width: "100%" }}>
            Balance:
          </label>
          <br />
          <input
            type="number"
            style={{ width: "100%" }}
            id="balance"
            name="description"
            value={formData.balance || ""}
            onChange={handleChange}
            required
          />
        </div>
        <button className="btn btn-primary" type="submit">
          Submit
        </button>
      </form> */}
      {/* <BookForm /> */}
    </>
  );
};

export default EditUser;
