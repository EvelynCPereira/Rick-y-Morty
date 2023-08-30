import { useState, useEffect} from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

import Cards from './components/Cards.jsx';
import Nav from './components/Nav.jsx'
import About from './views/about/About.jsx'
import Detail from './views/detail/Detail.jsx'
import Error from './views/error404/Error.jsx'
import Form  from './views/form/Form.jsx'
import Favorites from './views/favorites/Favorites.jsx'

import './App.css';

function App() {

   const [characters, setCharacters] = useState([]);
   const location = useLocation();
   const navigate = useNavigate();
   const [access, setAccess] = useState(false);
   const PASSWORD = '123asd';
   const EMAIL = "eve@gmail.com";
   
   function login(userData) {
      if (userData.password === PASSWORD && userData.email === EMAIL) {
         setAccess(true);
         navigate('/home');
      }else{
         alert("usuario o contraseña incorrecta")
      }
   }
   
   function logOutHandler(){
      setAccess(false);
   }

   useEffect(() => {
      if(access && location.pathname === "/"){
         navigate("/home")
      }
   }, [access, location.pathname]);

   function searchHandler(id) {
      if (characters.find(char => char.id === Number(id))) {
         alert('It already exists');
         return
      } else {
         axios(`https://rickandmortyapi.com/api/character/${id}`)
            .then(({ data }) => {
               data.name && setCharacters(oldChars => [...oldChars, data])
            })
            .catch(() => alert('¡No hay personajes con este ID!'))
      }

      // let memoria = [];
      // if (!memoria.includes(id)) {
      //    memoria.push(id)
      //    console.log(memoria);
      //    axios(`https://rickandmortyapi.com/api/character/${id}`).then(({ data }) => {

      //       //https://rym2-production.up.railway.app/api/character/${id}?key=henrym-usuariodegithub
      //       //CAMBIAR API!!!!
      //       // https://rym2-production.up.railway.app/api/character?key=henrym-usiario github
      // `https://rym2-production.up.railway.app/api/character/${id}?key=henrym-EvelynCPereira`
      //       //console.log(data)
      //       if (data.name) {
      //          setCharacters((oldChars) => [...oldChars, data]);
      //       } else {
      //          window.alert('¡No hay personajes con este ID!');
      //       }
      //    });
      // } else {
      //    window.alert("Ya tienes ese personaje")
      // }
   }


   function closeHandler(id) {
      let deleted = characters.filter((character) => character.id !== Number(id))
      setCharacters(deleted)
   }

   function randomHandler() {
      let randomId = (Math.random() * 826).toFixed();
      randomId = parseInt(randomId);
      if (!characters.includes(randomId)) {
         searchHandler(randomId)
      } else {
         alert('Este personaje ya ha sido agregado')
         return;
      }
   }

   return (
      <div className='App'>
         {location.pathname !== "/" && (<Nav onSearch={searchHandler} randomHandler={randomHandler} logOutHandler= {logOutHandler}/>)}
         
         <Routes>

            <Route path="/home"
               element={<Cards characters={characters} onClose={closeHandler} />} />
            <Route path="/detail/:id" element={<Detail/> } />
            <Route path="/about" element={<About/> } />
            <Route path='/favorites' element= {<Favorites/>}/>
            <Route path="/" element={<Form login={login}/>} />
            <Route path="*" element={<Error/>}/>
         </Routes>

      </div>
   );
}

export default App

