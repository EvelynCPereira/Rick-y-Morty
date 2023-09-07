import Card from './Card';
import "./StyleCards.css"

function Cards({characters,onClose}) {
   return (
   <div className="card-container">
   {characters?.map((personaje)=>(
      <Card 
      key= {personaje.id}
      character={personaje} 
      onClose={onClose}
      />
   ))}

   </div>
   )
}
export default Cards