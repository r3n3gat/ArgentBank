import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import Form from '../Components/Form';
import userCircle from '../designs/img/circle-user-solid.png';
import { login } from '../redux/actions/login'; 

function Login() {
  const dispatch = useDispatch(); // Hook to call Redux actions
  const token = useSelector((state) => state.auth.token); // Token called from the store
  const navigate = useNavigate();
  const error = useSelector((state) => state.auth.error)

  // Function called when the user validates the form
  const handleSubmit = (userData) => {
    // call the action to handle the connexion
    dispatch(login(userData));
  };

  useEffect(() => {
    if (token) {
      navigate('/profile');
    }
  }, [token, navigate]);
  return (
    <>
      <Header />
      <main className="main bg-dark">
        <section className="sign-in-content">
          <img src={userCircle} className="user-icon" alt="icone de profil utilisateur" />
          <h1>Sign In</h1>
          {error && <p className="error-message">{error}</p>}
          <Form onSubmit={handleSubmit} />
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Login;