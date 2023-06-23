import React from 'react';

export default function DetailsBox(props){
  return (
   <div className = "details-box">
   <h1>{props.detailsData.name}</h1>
   <img src={props.detailsData.image} alt = {props.detailsData.name}/>
   <p dangerouslySetInnerHTML={{__html:props.detailsData.summary}}></p>
   
   <h2>Ingredients</h2>
   <ul>
    {props.detailsData.ingredients.map((e,i) => <li key={`${e}${i}`}>{e}</li>)}
   </ul>
   
   {props.detailsData.equipments.length!==0?
   <>
   <h2>Equipments</h2>
   <ul>
    {props.detailsData.equipments.map((e,i) => <li key={`${e}${i}`}>{e}</li>)}
   </ul>
   </>:null}
   
   <h2>Steps</h2>
   <div className = "steps">
    {props.detailsData.steps.map((e,i) => <p key={`${e}${i}`}><span>{i+1}) </span>{e}</p>)}
    </div>
    <h3>Happy Cooking !</h3>
    
    <button onClick = {props.f1} className="close-btn-details"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
</svg></button>
   </div>
  )
}