import { GET_USER_INFO } from "../types";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:3000/api/v1";
axios.defaults.headers.post["Content-Type"] = `application/json`;

export function getCurrentUser(payload) {
  return function (dispatch) {
    axios
      .get(`/user/current-user`, {
        headers: {
          authorization: payload,
        },
      })
      .then(({ data: { user } }) => {
        dispatch({
          type: GET_USER_INFO,
          payload: user,
        });
      });
  };
}

export function userSignup(payload, history) {
  return function (dispatch) {
    axios
      .post(`/user/signup`, {
        user: payload,
      })
      .then(({ data: { user } }) => {
        console.log(user);
        dispatch({
          type: GET_USER_INFO,
          payload: user,
        });

        history.push("/login");
      });
  };
}

export function userLogin(payload, history) {
  return function (dispatch) {
    axios
      .post("/user/login", {
        user: payload,
      })
      .then(({ data: { user } }) => {
        dispatch({
          type: GET_USER_INFO,
          payload: user,
        });
        localStorage.setItem("authToken", user.token);
        history.push("/");
      });
  };
}
