import axios from "axios";

export const ADD_FAV = "ADD_FAV";
export const REMOVE_FAV = "REMOVE_FAV";
export const SORT = "SORT";
export const FILTER = "FILTER";
export const RESET = "RESET";

export const addFav = (character) => {
  const endpoint = "http://localhost:3001/rickandmorty/fav";
  return async (dispatch) => {
    try {
      const { data } = await axios.post(endpoint, character);
      return dispatch({
        type: "ADD_FAV",
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const removeFav = (id) => {
  const endpoint = "http://localhost:3001/rickandmorty/fav/" + id;
  return async (dispatch) => {
    try {
      const { data } = await axios.delete(endpoint);
      return dispatch({
        type: "REMOVE_FAV",
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};
export function filterByGender(gender) {
  return {
    type: FILTER,
    payload: gender,
  };
}

export function sortById(order) {
  return {
    type: SORT,
    payload: order,
  };
}

export function reset() {
  return {
    type: RESET,
  };
}
