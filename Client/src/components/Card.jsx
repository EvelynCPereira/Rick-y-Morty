import { NavLink, useNavigate } from "react-router-dom";
import { addFav, removeFav } from "../redux/action"
import { useSelector, useDispatch } from "react-redux"
import { useState, useEffect } from "react";
import "./StyleCards.css"


function Card(props) {
   const { onClose } = props
   const { name, species, gender, image, id } = props.character
   const navigate = useNavigate();
   const myFavorites = useSelector((state) => state.myFavorites);
   const dispatch = useDispatch();
   const [isFav, setIsFav] = useState(false);
   // const [closeBtn, setCloseBtn] = useState(true);

   useEffect(() => {
      myFavorites.forEach((fav) => {
         if (fav.id === id) {
            setIsFav(true);
         }
      });
   }, [myFavorites]);

   // useEffect(() => {
   //    if (!onClose) {
   //       setCloseBtn(false);
   //    }
   // }, []);

   function handleFavorite(arg) {
      if (isFav) {
         setIsFav(false);
         dispatch(removeFav(arg));
      } else {
         setIsFav(true);
         dispatch(addFav(arg))
      }
   }

   function navigateHandler() {
      navigate(`/detail/${id}`);
   }

   return (
      <div className="card-container">
      <div className="card">
         <div className="face front">
            {location.pathname === "/home" && (<button className="close-button" onClick={() => { onClose(id), dispatch(removeFav(id)) }} >X</button>)}
            {isFav ? (<button className="heart-button" onClick={() => { handleFavorite(id) }}>❤️</button>)
               : (<button className="heart-button" onClick={() => { handleFavorite(props.character) }}>🤍</button>)}
            <NavLink to={`/detail/${id}`}>
               <h2 className="character-name" onClick={navigateHandler}> {name}</h2>
            </NavLink>
            <div className="overlay">
               <h3 className="left-info">{species}</h3>
               <h3 className="right-info">{gender}</h3>
            </div>
            <img className="character-image" src={image} alt='imagen' />
         </div>
      </div>
      </div>
   );
}
export default Card