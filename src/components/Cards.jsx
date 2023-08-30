import Card from './Card';

function Cards({characters,onClose}) {
   return (
   <div>
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