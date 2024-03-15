import signUpActionTypes from './signup.types';
import axios from 'axios';
import url from '../../config/url';

//sign up actions
export const signUp = (taxId) => async (dispatch) => {
  dispatch({ type: signUpActionTypes.SIGN_UP_SUBMITTING });
  try {
    let headers = {
      'Content-Type': 'application/json',
    }
    const res = await axios.post(`${url.BASE_URL}user/verify-id`, { id: taxId.id });
    const { tp_name } = res.data;
    const payload = {
      taxId: taxId.id,
      taxPayerName: tp_name,
      isValid: true,
      createWallet:taxId.createWallet
    };

    dispatch({ type: signUpActionTypes.SIGN_UP_SUBMITTING });
    dispatch({ type: signUpActionTypes.SIGN_UP, payload });
  } catch (e) {
    dispatch({ type: signUpActionTypes.SIGN_UP_SUBMITTING });
    if (e.response) {
      let payload = Object.values(e.response.data.message);
      console.log(payload);
      dispatch({ type: signUpActionTypes.SIGN_UP_ERRORS, payload });
      setTimeout(() => {
        payload = null;
        dispatch({ type: signUpActionTypes.SIGN_UP_ERRORS, payload });
      }, 4000);
    } else if (e.request) {
      alert('Cannot carry out this request at this time. Please try again');
    }
  }
};

export const resetSubmitting = () => (dispatch) => {
  return dispatch({ type: signUpActionTypes.RESET_SIGN_UP_SUBMITTING });
};
export const clearSignUp = () => (dispatch) => {
  return dispatch({ type: signUpActionTypes.CLEAR_SIGN_UP });
};
