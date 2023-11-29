// redux/reducers/login.js
const initialState = {
  token: null,
  error: null,
  firstname: "",
  lastname: "",
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        token: action.payload.token,
        firstname: action.payload.firstname,
        lastname: action.payload.lastname,
        error: null,
      };
    case "AUTH_ERROR":
      return {
        ...state,
        error: action.payload.error,
        firstname: action.payload.firstname,
        lastname: action.payload.lastname,
      };
    case "LOGOUT":
      return {
        ...state,
        token: null,
        firstname: action.payload.firstname,
        lastname: action.payload.lastname,
        error: null,
      };
    default:
      return state;
  }
};

export default authReducer;
