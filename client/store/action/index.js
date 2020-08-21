import {
  GET_USER_INFO,
  GET_TEAM_INFO,
  GET_BOARD_INFO,
  GET_BOARD_LIST,
  GET_TEAM_LIST,
} from "../types";

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

export function createBoard(payload, history) {
  return function (dispatch) {
    console.log(payload);
    axios
      .post(
        "/board/create",
        {
          board: payload,
        },
        {
          headers: {
            Authorization: `Token ${localStorage.authToken}`,
          },
        }
      )
      .then(({ data: { board } }) => {
        dispatch({
          type: GET_BOARD_INFO,
          payload: board,
        });
        return history.push("/boards");
      });
  };
}

export function getBoardList() {
  return function (dispatch) {
    axios
      .get("/board/all", {
        headers: {
          Authorization: `Token ${localStorage.authToken}`,
        },
      })
      .then(({ data: { boards } }) => {
        return dispatch({
          type: GET_BOARD_LIST,
          payload: boards,
        });
      });
  };
}

export function createTeam(payload, history) {
  return function (dispatch) {
    console.log(payload);
    axios
      .post(
        "/team/create",
        {
          team: payload,
        },
        {
          headers: {
            Authorization: `Token ${localStorage.authToken}`,
          },
        }
      )
      .then(({ data: { team } }) => {
        dispatch({
          type: GET_TEAM_INFO,
          payload: team,
        });
        return history.push(`/team/${team.slug}`);
      });
  };
}

export function getTeamList() {
  return function (dispatch) {
    axios
      .get("/team/all", {
        headers: {
          Authorization: `Token ${localStorage.authToken}`,
        },
      })
      .then(({ data: { teams } }) => {
        console.log(teams);
        return dispatch({
          type: GET_TEAM_LIST,
          payload: teams,
        });
      });
  };
}

export function getSingleTeamInfo(teamSlug) {
  return function (dispatch) {
    axios.get(`/team/${teamSlug}`).then(({ data: { team } }) => {
      return dispatch({
        type: GET_TEAM_INFO,
        payload: team,
      });
    });
  };
}

export function editTeam(teamSlug, payload, history, dest) {
  return function (dispatch) {
    console.log({ teamSlug });
    axios
      .post(
        `/team/${teamSlug}/update`,
        {
          team: payload,
        },
        {
          headers: {
            Authorization: `Token ${localStorage.authToken}`,
          },
        }
      )
      .then(({ data: { team } }) => {
        console.log(team, teamSlug);
        history.push(dest);
        return dispatch({
          type: GET_TEAM_INFO,
          payload: team,
        });
      });
  };
}

export function deleteTeam(slug,history) {
  return function (dispatch) {
    axios
      .delete(`/team/${slug}/delete`, {
        headers: {
          Authorization: `Token ${localStorage.authToken}`,
        },
      })
      .then((data) => {
        history.push("/boards")
        return dispatch({
          type: GET_TEAM_INFO,
          payload: {},
        });
      });
  };
}
