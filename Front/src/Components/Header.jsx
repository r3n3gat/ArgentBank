import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/actions/logout";
import logo from "../designs/img/argentBankLogo.png";
import userCircle from "../designs/img/circle-user-solid.png";
import logoutUser from "../designs/img/logoutUser.png";
import "../designs/css/main.css";

const Header = () => {
  const token = useSelector((state) => state.auth.token);
  const username = useSelector((state) => state.user.username);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header>
      <nav className="main-nav">
        <Link className="main-nav-logo" to="/">
          <img
            className="main-nav-logo-image"
            src={logo}
            alt="Argent Bank Logo"
          />
          <h1 className="sr-only">Argent Bank</h1>
        </Link>
        {token ? (
          <div className="user-logout-container">
            <div className="user-info">
              <img src={userCircle} className="user-icon" alt="User Icon" />
              <span className="user-header">{username}</span>
            </div>
            <Link to="/" onClick={handleLogout} className="logout-link">
              <img
                src={logoutUser}
                className="user-icon"
                alt="Icone de logout"
              />
              Sign Out
            </Link>
          </div>
        ) : (
          <Link className="main-nav-item" to="/login">
            <img
              src={userCircle}
              className="user-icon"
              alt="Icone de profil utilisateur"
            />
            Sign In
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Header;
