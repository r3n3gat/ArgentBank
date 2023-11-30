import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  useEffect(() => {
    if (token) {
      // If a token is present, make a api call to obtain the user's username
      const fetchProfile = async () => {
        try {
          const response = await fetch(
            "http://localhost:3001/api/v1/user/profile",
            {
              method: "POST", // Change the method to POST
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (response.ok) {
            const data = await response.json();
            dispatch({
              type: "SET_USER",
              payload: {
                username: data.body.userName, // Updates the username in the Redux state              },
              },
            });
          } else {
            console.log("Erreur");
          }
        } catch (error) {
          console.log("Erreur");
        }
      };

      fetchProfile();
    }
  }, [dispatch, token]);

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
          // Afficher le profil de l'utilisateur et le bouton de déconnexion
          <div className="user-logout-container">
            <div className="user-info">
              <img src={userCircle} className="user-icon" alt="User Icon" />
              <span className="user-header">{username}</span>
            </div>
            <Link to="/" onClick={handleLogout} className="logout-link">
              <img
                src={logoutUser}
                className="user-icon"
                alt="icone de logout"
              />
              Sign Out
            </Link>
          </div>
        ) : (
          // Afficher le lien pour se connecter
          <Link className="main-nav-item" to="/login">
            <img
              src={userCircle}
              className="user-icon"
              alt="icone de profil utilisateur"
            />
            Sign In
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Header;
