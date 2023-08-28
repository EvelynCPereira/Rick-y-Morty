import {useState} from "react";
import { useLocation } from "react-router-dom";
import "./styleNav.css"

function SearchBar({onSearch, randomHandler}) {
   const location = useLocation();
   const [id, setId] = useState("")
   function changeHandler (inp){
      let input = inp.target.value
      setId(input)
   }

   return (
    <div>
        {location.pathname === "/home" && (
            <div>
                <input
                    className='search-input'
                    type='search'
                    value={id}
                    onChange={changeHandler}
                />
                <button
                    className='search-button'
                    onClick={() => onSearch(id)}
                >
                    Agregar
                </button>
                <button
                    className='random-button'
                    onClick={randomHandler}
                >
                    Random
                </button>
            </div>
        )}
         {/* se pasa la funcion por callBack cuando se pasan parametros para  */}
         {/* evitar un bucle infinito */}
      </div>
   );
}
export default SearchBar