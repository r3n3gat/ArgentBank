// redux/actions/login.js
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

      if (response.status === 200) {
        const data = await response.json();
        const token = data.body.token;

        dispatch({
          type: "LOGIN",
          payload: {
            token: token,
          },
        });

        localStorage.setItem("token", token);

        // Récupérer les informations de l'utilisateur après la connexion réussie
        const profileResponse = await fetch(
          "http://localhost:3001/api/v1/user/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (profileResponse.ok) {
          const profileData = await profileResponse.json();
          dispatch(
            setUser({
              username: profileData.body.userName,
              firstname: profileData.body.firstName,
              lastname: profileData.body.lastName,
            })
          );
        }
      } else {
        // Gérer les erreurs de connexion
        // ...
      }
    } catch (error) {
      // Gérer les exceptions
      // ...
    }
  };
};

export const setUser = (userData) => {
  return {
    type: "SET_USER",
    payload: userData,
  };
};
