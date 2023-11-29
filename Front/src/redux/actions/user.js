// action.js
export const setUser = (userData) => {
  return {
    type: "SET_USER",
    payload: userData,
  };
};

export const setProfileUsername = (token, username) => async (dispatch) => {
  try {
    const response = await fetch("http://localhost:3001/api/v1/user/profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        userName: username,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data);
      dispatch(
        setUser({
          username: data.body.userName,
          firstname: data.body.firstName,
          lastname: data.body.lastName,
        })
      );
    } else {
      console.log("Erreur lors de la mise à jour du nom d'utilisateur");
    }
  } catch (error) {
    console.log(error);
  }
};
