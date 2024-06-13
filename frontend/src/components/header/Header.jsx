import React from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  let user = useSelector((state) => state.auth.auth);

  const handleLogOut = () => {
    // const user = localStorage.getItem("user");
    user &&
    localStorage.clear();
    user = null
    // user = null;
    // console.log("user", user);
  };

  console.log("user", user);

  return (
    <header className="header">
      <nav className="container nav">
        <ul className="nav-list">
          <div className="nav-left">
            <li className="nav-item">
              <NavLink to="/" className="nav-link" activeClassName="active">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/about"
                className="nav-link"
                activeClassName="active"
              >
                About
              </NavLink>
            </li>
          </div>

          <div className="nav-right">
            <li className="nav-item">
              <NavLink className="nav-link" activeClassName="active" to="/cart">
                Cart
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                activeClassName="active"
                to="/store"
              >
                Store
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                activeClassName="active"
                to="/registration"
              >
                Registration
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                onClick={handleLogOut}
                className="nav-link"
                activeClassName="active"
                to="/login"
              >
                {user ? "Log Out" : "Log In"}
              </NavLink>
            </li>
          </div>
        </ul>
      </nav>
      {/* <hr /> */}
      {/* <Outlet /> */}
    </header>
  );
};

export default Header;
