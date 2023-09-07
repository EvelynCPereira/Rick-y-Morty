import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function Detail() {
  const [character, setCharacter] = useState({});
  const { id } = useParams();

  useEffect(() => {
    axios(`http://localhost:3001/rickandmorty/character/${id}`).then(
      ({ data }) => {
        if (data.name) {
          setCharacter(data);
        }
      }
    );
    return setCharacter({});
  }, []);

  return (
    <div className="card">
      <div className="face back">
        <h2>{character.name}</h2>
        <img src={character.image} alt={character.name} />
        <h3>Species: </h3>
        <p>{character.species}</p>
        <h3>Gender: </h3>
        <p>{character.gender}</p>
        <h3>Status: </h3>
        <p>{character.status}</p>
        <h3>Origin: </h3>
        <p>{character.origin?.name}</p>
        <h3>Location: </h3>
        <p>{character.location?.name}</p>
      </div>
    </div>
  );
}
export default Detail;
