import Card from './Card';

function Cards(props) {
   return <div>
   {props.characters.map((personaje)=>(
      <Card 
      key= {personaje.id}
      image={personaje.image} 
      onClose={props.onClose}
      id={personaje.id}
      name = {personaje.name}
      status={personaje.status}
      species={personaje.species}
      gender={personaje.gender}
      origin={personaje.origin.name}
      />
   ))}

   </div>;
}
export default Cards