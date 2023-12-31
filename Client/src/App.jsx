import { useState, useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

import Cards from "./components/Cards.jsx";
import Nav from "./components/Nav.jsx";
import About from "./views/about/About.jsx";
import Detail from "./views/detail/Detail.jsx";
import Error from "./views/error404/Error.jsx";
import Form from "./views/form/Form.jsx";
import Favorites from "./views/favorites/Favorites.jsx";

import "./App.css";

function App() {
  const [characters, setCharacters] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const [access, setAccess] = useState(false);

  // useEffect(() => {
  //   !access && navigate("/");
  // }, [access]);

  async function login(userData) {
    try {
      const { email, password } = userData;
      const URL = "http://localhost:3001/rickandmorty/login/";
      const { data } = await axios(
        URL + `?email=${email}&password=${password}`
      );
      const { acceso } = data;
      setAccess(data);
      acceso && navigate("/home");
    } catch (error) {
      alert(error);
    }
  }

  function logOutHandler() {
    setAccess(false);
  }

  useEffect(() => {
    if (!access && location.pathname === "/") {
      navigate("/");
    }
  }, [access, location.pathname]);

  async function searchHandler(id) {
    try {
      if (characters.find((char) => char.id === Number(id))) {
        alert("It already exists");
        return;
      } else {
        const { data } = await axios(
          `http://localhost:3001/rickandmorty/character/${id}`
        );

        data.name && setCharacters((oldChars) => [...oldChars, data]);
      }
    } catch (error) {
      console.log(error);
      alert("¡No hay personajes con este ID!");
    }
  }

  function closeHandler(id) {
    let deleted = characters.filter((character) => character.id !== Number(id));
    setCharacters(deleted);
  }

  function randomHandler() {
    let randomId = (Math.random() * 826).toFixed();
    randomId = parseInt(randomId);
    if (!characters.includes(randomId)) {
      searchHandler(randomId);
    } else {
      alert("Este personaje ya ha sido agregado");
      return;
    }
  }

  return (
    <div className="App">
      {location.pathname !== "/" && (
        <Nav
          onSearch={searchHandler}
          randomHandler={randomHandler}
          logOutHandler={logOutHandler}
        />
      )}

      <Routes>
        <Route
          path="/home"
          element={<Cards characters={characters} onClose={closeHandler} />}
        />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/about" element={<About />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/" element={<Form login={login} />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
