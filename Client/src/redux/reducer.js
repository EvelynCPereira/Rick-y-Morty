import { ADD_FAV, REMOVE_FAV, FILTER, SORT, RESET } from "./action";
import axios from "axios";

let initialState = {
  myFavorites: [],
  allCharacters: [],
};
function rootReducer(state = initialState, action) {
  let sorted;
  switch (action.type) {
    case ADD_FAV:
      return {
        ...state,
        myFavorites: payload,
        allCharacters: payload,
      };
    case REMOVE_FAV:
      return {
        ...state,
        myFavorites: payload,
      };
    case FILTER:
      return {
        ...state,
        myFavorites: state.allCharacters.filter(
          (character) => character.gender === action.payload
        ),
      };

    case SORT:
      if (action.payload === "Ascendente") {
        sorted = state.myFavorites.sort((a, b) => (a.id > b.id ? 1 : -1));
      } else {
        sorted = state.myFavorites.sort((a, b) => (b.id > a.id ? 1 : -1));
      }

      return {
        ...state,
        myFavorites: [...sorted],
      };

    case RESET:
      return {
        ...state,
        myFavorites: state.allCharacters,
      };
    default:
      return {
        ...state,
      };
  }
}

export default rootReducer;
