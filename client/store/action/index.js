import {
  GET_USER_INFO,
  GET_TEAM_INFO,
  GET_BOARD_INFO,
  GET_ALL_PERSONAL_BOARDS,
  GET_ALL_TEAM_BOARDS,
  GET_TEAM_LIST,
  ADD_TEAM_BOARD,
  ADD_PERSONAL_BOARD,
  UPDATE_TEAM_MEMBER_LIST,
  ADD_LIST_TO_ALL_LIST,
  GET_ALL_LIST,
  ADD_LIST,
  ADD_CARD,
  UPDATE_LIST_INFO,
  REORDER_SAME_LIST_CARDS,
  DRAG_AND_DROP_BETWEEN_TWO_LIST,
  EDIT_CARD_INFO,
  GET_ALL_COMMENTS,
  ADD_COMMENT,
  EDIT_COMMENT,
  DELETE_COMMENT,
  GET_CURRENTLY_OPEN_CARD,
  UPDATE_CURRENT_CARD_INFO,
  DELETE_ALL_CARDS_IN_THE_LIST,
  DELETE_LIST,
  DELETE_CARD,
  FALLBACK,
} from "../types";

import { toast } from "react-toastify";

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
        return dispatch({
          type: GET_USER_INFO,
          payload: user,
        });
      });
  };
}

export function userSignup(payload, history) {
  return function (dispatch) {
    return axios
      .post(`/user/signup`, {
        user: payload,
      })
      .then(({ data: { user } }) => {
        toast.success("Account created successfuly");
        history.push("/login");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Something went wrong!");
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
        history.push("/boards");
        toast.success(`${user.name} logged in successfuly.`);
      })
      .catch((error) => toast.error(`Invalid email or password!`));
  };
}

export function getVerificationCode(payload, history) {
  return function (dispatch) {
    axios
      .put("/user/verify", {
        user: payload,
      })
      .then(({ data: { user } }) => {
        dispatch({
          type: GET_USER_INFO,
          payload: user,
        });
        history.push("/reset-password");
        toast.success(
          `OTP has been send to your registered email id`
        );
      })
      .catch((error) => toast.error("User not found!"));
  };
}

export function resetPassword(payload, history) {
  return function (dispatch) {
    axios
      .put("/user/reset-password", {
        user: payload,
      })
      .then((data) => {
        dispatch({
          type: GET_USER_INFO,
          payload: {},
        });
        return history.push("/login");
      })
      .catch((error) => {
        dispatch({
          type: GET_USER_INFO,
          payload: {},
        });
        toast.error(`Wrong OTP`);
        return history.push("/user/verify");
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
        // dispatch({
        //   type: GET_BOARD_INFO,
        //   payload: board,
        // });
        if (board.teamId) {
          dispatch({
            type: ADD_TEAM_BOARD,
            payload: board,
          });
        } else {
          dispatch({
            type: ADD_PERSONAL_BOARD,
            payload: board,
          });
        }
        dispatch(getSingleBoardInfo(board.slug, history));
        // console.log(`/board/${board.slug}`);
        // return history.push(`/board/${board.slug}`);
      });
  };
}

// export function getBoardList() {
//   return function (dispatch) {
//     axios
//       .get("/board/all", {
//         headers: {
//           Authorization: `Token ${localStorage.authToken}`,
//         },
//       })
//       .then(({ data: { boards } }) => {
//         return dispatch({
//           type: GET_BOARD_LIST,
//           payload: boards,
//         });
//       });
//   };
// }getPersonalBoards,getTeamBoards

export function getPersonalBoards() {
  return function (dispatch) {
    axios
      .get("/board/personal-boards", {
        headers: {
          Authorization: `Token ${localStorage.authToken}`,
        },
      })
      .then(({ data: { boards } }) => {
        return dispatch({
          type: GET_ALL_PERSONAL_BOARDS,
          payload: [...boards],
        });
      });
  };
}

export function getTeamBoards() {
  return function (dispatch) {
    axios
      .get("/board/team-boards", {
        headers: {
          Authorization: `Token ${localStorage.authToken}`,
        },
      })
      .then(({ data: { boards } }) => {
        return dispatch({
          type: GET_ALL_TEAM_BOARDS,
          payload: [...boards],
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

export function deleteBoard(boardSlug, history) {
  return function (dispatch) {
    axios
      .delete(`/board/${boardSlug}/delete`, {
        headers: {
          Authorization: `Token ${localStorage.authToken}`,
        },
      })
      .then((res) => {
        return history.push("/boards");
      })
      .catch((error) => console.log(error));
  };
}

export function getTeamList() {
  return function (dispatch) {
    axios
      .get("/team/all", {
        headers: {
          Authorization: `Token ${localStorage.authToken || ""}`,
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

export function getSingleTeamInfo(teamSlug, history) {
  return function (dispatch) {
    axios
      .get(`/team/${teamSlug}`, {
        headers: {
          Authorization: `Token ${localStorage.authToken || ""}`,
        },
      })
      .then(({ data: { team } }) => {
        return dispatch({
          type: GET_TEAM_INFO,
          payload: team,
        });
      })
      .catch((error) => {
        console.log(error);
        return history.push(`/error/team/${teamSlug}/not-found`);
      });
  };
}

export function editTeam(teamSlug, payload, history, dest = "") {
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

        dispatch({
          type: GET_TEAM_INFO,
          payload: team,
        });
        if (dest) {
          return history.push(`/team/${team.slug}/account`);
        } else {
          return history.push(`/team/${team.slug}`);
        }
      });
  };
}

export function deleteTeam(slug, history) {
  return function (dispatch) {
    axios
      .delete(`/team/${slug}/delete`, {
        headers: {
          Authorization: `Token ${localStorage.authToken}`,
        },
      })
      .then((data) => {
        history.push("/boards");
        return dispatch({
          type: GET_TEAM_INFO,
          payload: {},
        });
      });
  };
}

export function addTeamMember(teamSlug, username, history) {
  return function (dispatch) {
    axios
      .post(`/team/${teamSlug}/add-member/${username}`, null, {
        headers: {
          Authorization: `Token ${localStorage.authToken}`,
        },
      })
      .then(({ data: { team } }) => {
        dispatch({
          type: UPDATE_TEAM_MEMBER_LIST,
          payload: team,
        });
        return history.push(`/team/${teamSlug}/members`);
      })
      .catch((error) => console.log(error));
  };
}

export function removeTeamMember(teamSlug, username, history, dest) {
  return function (dispatch) {
    axios
      .delete(`/team/${teamSlug}/remove-member/${username}`, {
        headers: {
          Authorization: `Token ${localStorage.authToken}`,
        },
      })
      .then(({ data: { team } }) => {
        dispatch({
          type: UPDATE_TEAM_MEMBER_LIST,
          payload: team,
        });
        return history.push(dest);
      })
      .catch((error) => console.log(error));
  };
}

export function getSingleBoardInfo(boardSlug, history) {
  return function (dispatch) {
    axios
      .get(`/board/${boardSlug}`, {
        headers: {
          Authorization: `Token ${localStorage.authToken || ""}`,
        },
      })
      .then(({ data: { board } }) => {
        dispatch({
          type: GET_BOARD_INFO,
          payload: board,
        });
        return history.push(`/board/${board.slug}`);
      })
      .catch((error) => {
        console.log(error);
        return history.push(`/error/board/${boardSlug}/board-not-found`);
      });
  };
}

export function updateBoardInfo(payload, boardSlug, history) {
  return function (dispatch) {
    axios
      .put(
        `/board/${boardSlug}/update`,
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
        return history.push(`/board/${board.slug}`);
      })
      .catch((error) => {
        console.log(error);
        return history.push(`/error/board/${boardSlug}/board-not-found`);
      });
  };
}

export function createList(payload, boardSlug, history) {
  return function (dispatch) {
    axios
      .post(
        `/board/${boardSlug}/list/create`,
        {
          list: payload,
        },
        {
          headers: {
            Authorization: `Token ${localStorage.authToken}`,
          },
        }
      )
      .then(({ data: { list } }) => {
        dispatch({
          type: ADD_LIST,
          payload: list,
        });

        dispatch({
          type: ADD_LIST_TO_ALL_LIST,
          payload: list,
        });
      })
      .catch((error) => console.log(error));
  };
}

export function getAllList(boardSlug) {
  return function (dispatch) {
    axios
      .get(`/board/${boardSlug}/list/all`, {
        headers: {
          authorization: `Token ${localStorage.authToken}`,
        },
      })
      .then(({ data: { lists } }) => {
        return dispatch({
          type: GET_ALL_LIST,
          payload: lists,
        });
      })
      .catch((error) => console.log(error));
  };
}

export function deleteAllCardsInTheList(boardSlug, listSlug) {
  return function (dispatch) {
    axios
      .delete(`/board/${boardSlug}/list/${listSlug}/cards/delete`, {
        headers: {
          authorization: `Token ${localStorage.authToken}`,
        },
      })
      .then(({ data: { list } }) => {
        return dispatch({
          type: DELETE_ALL_CARDS_IN_THE_LIST,
          payload: list,
        });
      });
  };
}

export function deleteList(boardSlug, listSlug) {
  return function (dispatch) {
    return axios
      .delete(`/board/${boardSlug}/list/${listSlug}/delete`, {
        headers: {
          authorization: `Token ${localStorage.authToken}`,
        },
      })
      .then(({ data: { list } }) => {
        return dispatch({
          type: DELETE_LIST,
          payload: list,
        });
      })
      .catch((error) => console.log(error));
  };
}

export function createCard(payload, listSlug) {
  return function (dispatch) {
    axios
      .post(
        `/list/${listSlug}/card/add`,
        {
          card: payload,
        },
        {
          headers: {
            authorization: `Token ${localStorage.authToken}`,
          },
        }
      )
      .then(({ data: { card } }) => {
        dispatch({
          type: ADD_CARD,
          payload: card,
        });
      });
  };
}

export function deleteCard(listSlug, cardSlug) {
  return function (dispatch) {
    axios
      .delete(`/list/${listSlug}/card/${cardSlug}/delete`, {
        headers: {
          authorization: `Token ${localStorage.authToken}`,
        },
      })
      .then(({ data: { card } }) => {
        dispatch({
          type: DELETE_CARD,
          payload: card,
        });
        return history.push(`/board/${boardSlug}`);
      })
      .catch((error) => console.log(error));
  };
}

export function editListInfo(payload, boardSlug, listSlug) {
  return function (dispatch) {
    axios
      .put(
        `/board/${boardSlug}/list/${listSlug}/update`,
        {
          list: payload,
        },
        {
          headers: {
            authorization: `Token ${localStorage.authToken}`,
          },
        }
      )
      .then(({ data: { list } }) => {
        return dispatch({
          type: UPDATE_LIST_INFO,
          payload: list,
        });
      });
  };
}

export function reorderSameListCards(payload, boardSlug, fallBack) {
  return function (dispatch) {
    axios
      .put(
        `/board/${boardSlug}/list/reorder`,
        {
          list: payload,
          fallBack,
        },
        {
          headers: {
            authorization: `Token ${localStorage.authToken}`,
          },
        }
      )
      .then(({ data: { list } }) => {
        console.log(list);
        return dispatch({
          type: REORDER_SAME_LIST_CARDS,
          payload: list,
        });
      })
      .catch((error) => {
        toast.error(`Something went wrong`);
        return dispatch({
          type: FALLBACK,
          payload: fallBack,
        });
      });
  };
}

export function dragAndDropBetweenTwoList(
  payload,
  boardSlug,
  cardSlug,
  successMsg,
  fallBack
) {
  return function (dispatch) {
    axios
      .put(
        `/board/${boardSlug}/list/reorder-between-two-list/card/${cardSlug}`,
        {
          payload: payload,
          fallBack,
        },
        {
          headers: {
            authorization: `Token ${localStorage.authToken}`,
          },
        }
      )
      .then(({ data: { updatedLists } }) => {
        toast.success(successMsg);
        return dispatch({
          type: DRAG_AND_DROP_BETWEEN_TWO_LIST,
          payload: updatedLists,
        });
      })
      .catch((error) => {
        toast.error(`Something went wrong`);
        return dispatch({
          type: FALLBACK,
          payload: fallBack,
        });
      });
  };
}

export function editCardInfo(payload, listSlug, cardSlug) {
  return function (dispatch) {
    axios
      .put(
        `/list/${listSlug}/card/${cardSlug}/edit`,
        {
          card: payload,
        },
        {
          headers: {
            authorization: `Token ${localStorage.authToken}`,
          },
        }
      )
      .then(({ data: { card } }) => {
        dispatch({
          type: EDIT_CARD_INFO,
          payload: card,
        });

        dispatch({
          type: UPDATE_CURRENT_CARD_INFO,
          payload: card,
        });
      })
      .catch((error) => console.log(error));
  };
}

export function addCurrentlyOpenCard(listSlug, cardSlug) {
  return function (dispatch) {
    axios
      .get(`/list/${listSlug}/card/${cardSlug}`, {
        headers: {
          authorization: `Token ${localStorage.authToken}`,
        },
      })
      .then(({ data: { card } }) => {
        return dispatch({
          type: GET_CURRENTLY_OPEN_CARD,
          payload: { ...card, listSlug },
        });
      });
  };
}

export function getAllComments(listSlug, cardSlug) {
  return function (dispatch) {
    axios
      .get(`/list/${listSlug}/card/${cardSlug}/comments/all`, {
        headers: {
          authorization: `Token ${localStorage.authToken}`,
        },
      })
      .then(({ data: { comments } }) => {
        return dispatch({
          type: GET_ALL_COMMENTS,
          payload: comments,
        });
      })
      .catch((error) => console.log(error));
  };
}

export function addComment(payload, listSlug, cardSlug) {
  return function (dispatch) {
    axios
      .post(
        `/list/${listSlug}/card/${cardSlug}/comment/create`,
        {
          comment: payload,
        },
        {
          headers: {
            authorization: `Token ${localStorage.authToken}`,
          },
        }
      )
      .then(({ data: { comment } }) => {
        console.log(comment);
        dispatch({
          type: ADD_COMMENT,
          payload: comment,
        });
        return dispatch(getAllComments(listSlug, cardSlug));
      });
  };
}

export function editComment(payload, listSlug, cardSlug, commentId, name) {
  return function (dispatch) {
    axios
      .put(
        `/list/${listSlug}/card/${cardSlug}/comment/${commentId}/edit`,
        {
          comment: payload,
        },
        {
          headers: {
            authorization: `Token ${localStorage.authToken}`,
          },
        }
      )
      .then(({ data: { comment } }) => {
        comment.memberId = {
          memberId: comment.memberId,
          name,
        };
        console.log(comment);
        dispatch({
          type: EDIT_COMMENT,
          payload: comment,
        });
        return dispatch(getAllComments(listSlug, cardSlug));
      })
      .catch((error) => console.log(error));
  };
}

export function deleteComment(listSlug, cardSlug, commentId) {
  return function (dispatch) {
    axios
      .delete(
        `/list/${listSlug}/card/${cardSlug}/comment/${commentId}/delete`,

        {
          headers: {
            authorization: `Token ${localStorage.authToken}`,
          },
        }
      )
      .then(({ data: { comment } }) => {
        return dispatch({
          type: DELETE_COMMENT,
          payload: comment,
        });
      })
      .catch((error) => console.log(error));
  };
}
