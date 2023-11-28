import React, { useState } from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import Account from "../Components/Account";

function Dashboard() {
  const [isEditing, setIsEditing] = useState(false);

  const startEditing = () => {
    setIsEditing(true);
  };

  const cancelEditing = () => {
    setIsEditing(false);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Ajoutez la logique pour gérer la soumission du formulaire ici
  };
  return (
    <>
      <Header />
      <main className="main bg-dark">
        <div className="header">
          <h1>
            Welcome back
            <br />
            Tony Jarvis!
          </h1>
          {isEditing ? null : (
            <button className="edit-button" onClick={startEditing}>
              Edit Name
            </button>
          )}
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
              />
            </div>
            <div className="input__wrapper">
              <label htmlFor="firstname">First name</label>
              <input
                type="text"
                id="firstname"
                className="input__wrapper disabled"
                readOnly="readonly"
              />
            </div>
            <div className="input__wrapper">
              <label htmlFor="lastname">Last name</label>
              <input
                type="text"
                id="lastname"
                className="input__wrapper disabled"
                readOnly="readonly"
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
