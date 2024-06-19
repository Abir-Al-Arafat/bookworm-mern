import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addProduct } from "../../redux/actions/productActions";
import { useSelector } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import AdminHeader from "../../components/adminPanel/AdminHeader";

const AddBookPage = () => {
  const [isBookAdded, setIsBookAdded] = useState(false);
  const authSelector = useSelector((state) => state.auth.auth);
  const {
    handleSubmit,
    control,
    formState: { errors },
    getValues,
    watch,
    setValue,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      firstname: "",
      lastname: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
      address: "",
      city: "",
      balance: 0,
    },
  });

  const name = getValues("name");
  const author = getValues("author");
  const category = getValues("category");
  const description = getValues("description");
  const releaseDate = getValues("releaseDate");
  const pages = getValues("pages");
  const price = getValues("price");
  const stock = getValues("stock");

  useEffect(() => {
    console.log("Errors: ", errors);
  }, [errors]);

  const user = useSelector((state) => state.auth.user);

  const onSubmit = (data) => {
    console.log(data);
    console.log("Form is submitted ");
    // console.log("The username ", getValues("username"));
    console.log("The name ", getValues("name"));
    console.log("The author ", getValues("author"));
    console.log("The category ", getValues("category"));
    console.log("The description ", getValues("description"));
    console.log("The Release Date ", getValues("releaseDate"));
    console.log("The pages", getValues("pages"));
    console.log("The price", getValues("price"));
    console.log("The stock", getValues("stock"));
    // const { name, author, description, price } = formData;

    axios
      .post(
        `http://127.0.0.1:3000/products/add`,
        {
          name,
          author,
          category,
          description,
          releaseDate,
          pages,
          price,
          stock,
          // img,
        },
        {
          headers: {
            Authorization: `Bearer ${authSelector.token}`,
          },
        }
      )
      .then((response) => {
        console.log("Book Added:", response.data);
        if (response.data.success) {
          setIsBookAdded(true);
          //   alert("book added successfully");
        }
      })
      .catch((error) => {
        console.error("Error Adding Book:", error);
      });
  };

  console.log("book added", isBookAdded);
  // if (isBookAdded) {
  //   return <Navigate to="/" />;
  // }

  return (
    <>
      <div className="container">
        <AdminHeader />
      </div>

      {user && <h4 className="mb-1">You are logged in as {user}</h4>}
      <form
        className="d-flex flex-column form-container"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="form-group m-1">
          <label>Name</label>
          <Controller
            name="name"
            control={control}
            rules={{
              required: "Name is required",
              maxLength: {
                value: 50,
                message: "Name cannot have more than 50 characters.",
              },
            }}
            render={({ field }) => (
              <input
                maxLength={51}
                placeholder="Name Of the book"
                {...field}
                style={{ border: errors.name ? "1px solid red" : "" }}
              />
            )}
          />
          {errors.name && <span color="red">{errors.name.message}</span>}
        </div>
        <div className="form-group m-1">
          <label>Author</label>
          <Controller
            name="author"
            control={control}
            rules={{
              required: "Author is required",
              maxLength: {
                value: 50,
                message: "author cannot have more than 50 characters.",
              },
            }}
            render={({ field }) => (
              <input
                maxLength={51}
                placeholder="Enter Author Name"
                {...field}
                style={{ border: errors.author ? "1px solid red" : "" }}
              />
            )}
          />
          {errors.author && <span color="red">{errors.author.message}</span>}
        </div>

        <div className="form-group m-1">
          <label>Category</label>
          <Controller
            name="category"
            control={control}
            rules={{
              required: "Category is required",
              maxLength: {
                value: 20,
                message: "Category cannot have more than 20 characters.",
              },
            }}
            render={({ field }) => (
              <input
                maxLength={51}
                placeholder="Enter Category"
                {...field}
                style={{ border: errors.category ? "1px solid red" : "" }}
              />
            )}
          />
          {errors.category && (
            <span color="red">{errors.category.message}</span>
          )}
        </div>

        <div className="form-group m-1">
          <label>Description</label>
          <br />
          <Controller
            name="description"
            control={control}
            rules={{
              required: "Description is required",
              maxLength: {
                value: 200,
                message: "Description cannot have more than 200 characters.",
              },
            }}
            render={({ field }) => (
              <textarea
                maxLength={200}
                placeholder="Enter Description"
                {...field}
                style={{
                  border: errors.category ? "1px solid red" : "",
                  width: "100%",
                }}
              />
            )}
          />
          {errors.description && (
            <span color="red">{errors.description.message}</span>
          )}
        </div>

        <div className="form-group m-1">
          <label>Release Date</label>
          <Controller
            name="releaseDate"
            control={control}
            rules={{
              required: "Release Date is required",
            }}
            render={({ field }) => (
              <input
                type="date"
                placeholder="dd-mm-yyyy"
                {...field}
                style={{ border: errors.releaseDate ? "1px solid red" : "" }}
              />
            )}
          />
          {errors.releaseDate && (
            <span color="red">{errors.releaseDate.message}</span>
          )}
        </div>

        <div className="form-group m-1">
          <label>Pages</label>
          <Controller
            name="pages"
            control={control}
            rules={{
              required: "Pages number is required",
              maxLength: {
                value: 11,
                message: "Invalid Page number",
              },
            }}
            render={({ field }) => (
              <input
                type="number"
                onInput={(e) => (e.target.value = e.target.value.slice(0, 12))}
                maxLength={11}
                placeholder="Pages"
                {...field}
                style={{ border: errors.pages ? "1px solid red" : "" }}
              />
            )}
          />
          {errors.pages && <span color="red">{errors.pages.message}</span>}
        </div>

        <div className="form-group">
          <label>Price:</label>
          <Controller
            name="price"
            control={control}
            rules={{
              required: true,
              min: {
                value: 0,
                message: "Price cannot be less than 0.",
              },
              max: {
                value: 5000,
                message: "Price cannot be greater than 5000.",
              },
              pattern: {
                value: /^[0-9]+$/,
                message: "Please enter a valid number.",
              },
            }}
            render={({ field }) => (
              <input
                onInput={(e) => (e.target.value = e.target.value.slice(0, 5))}
                maxLength={5}
                placeholder="Enter Price"
                type="number"
                {...field}
              />
            )}
          />
          {errors.price && <span color="red">{errors.price.message}</span>}
        </div>

        <div className="form-group">
          <label>Stock:</label>
          <Controller
            name="stock"
            control={control}
            rules={{
              required: true,
              min: {
                value: 0,
                message: "Stock cannot be less than 0.",
              },
              max: {
                value: 5000,
                message: "Stock cannot be greater than 5000.",
              },
              pattern: {
                value: /^[0-9]+$/,
                message: "Please enter a valid number.",
              },
            }}
            render={({ field }) => (
              <input
                onInput={(e) => (e.target.value = e.target.value.slice(0, 5))}
                maxLength={5}
                placeholder="Enter Stock"
                type="number"
                {...field}
              />
            )}
          />
          {errors.stock && <span color="red">{errors.stock.message}</span>}
        </div>

        <button type="submit" className="btn btn-primary">
          Add a book
        </button>
      </form>
    </>
  );
};

export default AddBookPage;
