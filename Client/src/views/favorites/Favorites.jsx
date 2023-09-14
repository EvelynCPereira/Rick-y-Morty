import { useSelector, useDispatch } from "react-redux";
import { sortById, filterByGender } from "../../redux/action";
import Cards from "../../components/Cards";
import { useState, useEffect } from "react";

function Favorites() {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.myFavorites);
  const filtrados = useSelector((state) => state.filterChar);

  // useEffect(() => {
  //   !access && navigate("/");
  // }, [access]);

  function sortHandler(event) {
    dispatch(sortById(event.target.value));
  }
  const [auxFiltrados, setAuxFiltrados] = useState(false);
  function filterHandler(event) {
    if (event.target.value !== "AllGender") setAuxFiltrados(true);
    else setAuxFiltrados(false);
    dispatch(filterByGender(event.target.value));
  }

  return (
    <div>
      <select placeholder="Gender" onChange={filterHandler}>
        {["AllGender", "Male", "Female", "unknown", "Genderless"].map(
          (gender) => (
            <option key={gender} value={gender}>
              {gender}
            </option>
          )
        )}
      </select>
      <select placeholder="Sort" onChange={sortHandler}>
        {["Ascendente", "Descendente"].map((order) => (
          <option key={order} value={order}>
            {order}
          </option>
        ))}
      </select>

      {auxFiltrados ? (
        <Cards characters={filtrados} />
      ) : (
        <Cards characters={favorites} />
      )}
    </div>
  );
}

export default Favorites;
