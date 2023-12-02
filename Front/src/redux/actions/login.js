// authActions.js
export const login = (userData) => {
  return async (dispatch) => {
    try {
      const response = await fetch("http://localhost:3001/api/v1/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      console.log("HTTP Response:", response.status);

      if (response.status === 200) {
        const data = await response.json();
        const token = data.body.token;
        localStorage.setItem("token", token);

        // Récupérer les informations de profil après la connexion
        const profileResponse = await fetch(
          "http://localhost:3001/api/v1/user/profile",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (profileResponse.ok) {
          const profileData = await profileResponse.json();
          dispatch({
            type: "SET_USER",
            payload: {
              username: profileData.body.userName,
              firstname: profileData.body.firstName,
              lastname: profileData.body.lastName,
            },
          });
        }

        dispatch({
          type: "LOGIN",
          payload: {
            token: token,
          },
        });
      } else {
        // Handle errors
        dispatch({
          type: "AUTH_ERROR",
          payload: {
            error: "Email ou mot de passe non valides",
          },
        });
      }
    } catch (error) {
      console.error(error);
    }
  };
};
