import axios from "axios";
import authActionTypes from "./auth.types";
import url from "../../config/url";
export const login = (data) => async (dispatch) => {
  dispatch({ type: authActionTypes.SET_LOGIN_SUBMITTING });
  try {
    let user = {
      email: data.email,
      password: data.password
    }
    const login = await axios.post(`${url.BASE_URL}user/login`, user);
    const auth = login.data.token;
    dispatch({ type: authActionTypes.SET_LOGIN_SUBMITTING });
    dispatch({ type: authActionTypes.LOGIN, payload: auth });
    localStorage.setItem('ABSSIN_number', JSON.stringify(login?.data?.state_id));
  } catch (e) {
    if (e.response) {
      const errors = e.response.data.message;
      dispatch({
        type: authActionTypes.SET_LOGIN_ERRORS,
        payload: "Invalid login credentials",
      });
      setTimeout(() => {
        dispatch({ type: authActionTypes.SET_LOGIN_ERRORS, payload: null });
      }, 6000);
    } else if (e.request) {
      alert("Cannot carry out this request at this time. Please try again");
    }
  }
};

export const logout = () => async (dispatch) => {
  try {
    dispatch({ type: authActionTypes.LOGOUT });
  } catch (e) { }
};

export const disableSubmitting = () => async (dispatch) => {
  try {
    dispatch({ type: authActionTypes.SET_LOGIN_SUBMITTING_FALSE });
  } catch (e) { }
};

