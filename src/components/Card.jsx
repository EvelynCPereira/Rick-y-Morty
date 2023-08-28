import { NavLink, useNavigate } from "react-router-dom";

function Card(props) {
   
   const {name, status, species, gender, origin, image, onClose, id} = props
   const navigate = useNavigate()

   function navigateHandler (){
      navigate(`/detail/${id}`);
   }
   
   return (
      <div>
         <button onClick={()=>onClose(id)}>X</button>
         <NavLink to = {`/detail/${id}`}>
            <h2 onClick={navigateHandler}> {name}</h2>
         </NavLink>
         <h2>{status}</h2>
         <h2>{species}</h2>
         <h2>{gender}</h2>
         <h2>{origin}</h2>
         <img src={image} alt='imagen' />
      </div>
   );
}
export default Card