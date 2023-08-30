export const ADD_FAV = "ADD_FAV";
export const REMOVE_FAV = "REMOVE_FAV"
export const SORT = "SORT";
export const FILTER = "FILTER";
export const RESET = "RESET";

export const addFav = (character) =>{
  console.log(`adFav con ${character}`);
    return{
        type: ADD_FAV,
        payload: character
    }
}

export const removeFav = (id) =>{
  console.log(`removeFav con ${id}`);
    return{
        type: REMOVE_FAV,
        payload: id
    }
}
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