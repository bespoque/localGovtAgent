import axios, { ApiNoAuth, ApiNoAuth2 } from "./apiAdapter";

export const login = (userData) =>
  ApiNoAuth2.post("/oauth/token", userData, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    auth: {
      username: process.env.REACT_APP_AUTH_USERNAME ,
      password: process.env.REACT_APP_CLIENT_SECRET ,
    },
  });

export const forgotPassword = (data) => ApiNoAuth2.post("/user/update-forgot-password", data);
export const resetPassword = (data) => ApiNoAuth2.post("/user/reset-password", data);
export const registration = (data) => ApiNoAuth.post("/employee/register", data);
export const passwordLogin = (data) => ApiNoAuth.post("/employee/password-login", data);
export const resetToken = (data) => ApiNoAuth.post("/employee/reset-token", data);
export const recoverPassword = (data) => ApiNoAuth.post("/employee/reset-token", data);

export const fetchUserDetails = async () => axios.get(`/user/get-currently-logged-in-user`);
export const fetchEmployeeTypes = async () => ApiNoAuth.get(`/employee/getAllEmployeeTypes`);
export const fetchCountries = async () => ApiNoAuth.get(`/country/getAllCountries`);
export const fetchIndustries = async () => ApiNoAuth.get(`/company/getAllCompanyIndustries`);

export const handleLogout = () => {
  localStorage.removeItem("loginData");
  localStorage.removeItem("empId");
  window.location.href = "/";
};

export const sendPasswordForgotPassword = async (email) =>
  ApiNoAuth.post(`/employee/forgotPassword`, { email });

export const sendPasswordReset = async (data) =>
  ApiNoAuth.put(`/employee/resetPassword`, data);

export const fetchFullEmployeeDetails = async (empId) =>
  axios.get(`employee/getEmployeeByEmpId?empId=${empId}`);

export const changePassword = async (data) => axios.put(`/employee/changePassword`, data);
