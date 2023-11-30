import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import Account from "../Components/Account";
import { setProfileUsername } from "../redux/actions/user";

function Dashboard() {
  const [isEditing, setIsEditing] = useState(false);
  const [newUsername, setNewUsername] = useState("");
  const [firstname, setfirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const token = useSelector((state) => state.auth.token);
  const userData = useSelector((state) => state.user); // Récupère les données de l'utilisateur
  const dispatch = useDispatch();

  const startEditing = () => {
    setNewUsername(userData.username); // Initialise avec la valeur actuelle
    setfirstname(userData.firstname); // Initialise avec la valeur actuelle
    setlastname(userData.lastname); // Initialise avec la valeur actuelle
    setIsEditing(true);
  };

  const cancelEditing = () => {
    setIsEditing(false);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    dispatch(setProfileUsername(token, newUsername));
    setIsEditing(false);
  };

  const username = userData.username; // Utiliser userData pour obtenir le nom d'utilisateur

  return (
    <>
      <Header />
      <main className="main bg-dark">
        <div className="header">
          <h1>
            Welcome back
            <br />
            {username}!
          </h1>
          {!isEditing ? (
            <button className="edit-button" onClick={startEditing}>
              Edit Name
            </button>
          ) : null}
        </div>

        {isEditing ? (
          <form className="form form--edit" onSubmit={handleFormSubmit}>
            <h2>Edit profile</h2>
            <div className="input__wrapper">
              <label htmlFor="username">User name</label>
              <input
                type="text"
                id="username"
                className="input__wrapper"
                required="required"
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
              />
            </div>

            <div className="input__wrapper">
              <label htmlFor="firstname">First name</label>
              <input
                type="text"
                id="firstname"
                className="input__wrapper disabled"
                readOnly="readonly"
                value={firstname}
                disabled
              />
            </div>
            <div className="input__wrapper">
              <label htmlFor="lastname">Last name</label>
              <input
                type="text"
                id="lastname"
                className="input__wrapper disabled"
                readOnly="readonly"
                value={lastname}
                disabled
              />
            </div>
            <div className="form--edit__button">
              <button className="edit-button-form" type="submit">
                Save
              </button>
              <button className="edit-button-form" onClick={cancelEditing}>
                Cancel
              </button>
            </div>
          </form>
        ) : null}
        {/* Placer les composants Account ici */}
        <Account title="Argent Bank Checking (x8349)" amount="$2,082.79" />
        <Account title="Argent Bank Savings (x6712)" amount="$10,928.42" />
        <Account title="Argent Bank Credit Card (x8349)" amount="$184.30" />
      </main>
      <Footer />
    </>
  );
}

export default Dashboard;
