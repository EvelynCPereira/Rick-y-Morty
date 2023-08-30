import { NavLink, useNavigate } from "react-router-dom";
import { addFav, removeFav } from "../redux/action"
import { useSelector, useDispatch } from "react-redux"
import { useState, useEffect } from "react";


function Card(props) {
   const {onClose} = props
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
      <div>
         <button onClick={() => { onClose(id) }}>X</button>
         {isFav ? (<button onClick={() => { handleFavorite(id) }}>❤️</button>)
            : (<button onClick={() => { handleFavorite(props.character) }}>🤍</button>)}
         <NavLink to={`/detail/${id}`}>
            <h2 onClick={navigateHandler}> {name}</h2>
         </NavLink>
         <h2>{species}</h2>
         <h2>{gender}</h2>
         <img src={image} alt='imagen' />
      </div>
   );
}
export default Card