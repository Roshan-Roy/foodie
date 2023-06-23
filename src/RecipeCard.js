import React from 'react';

export default function RecipeCard(props){
  const showBtnClick = () => {
    props.f1(props.dataForCard);
  }
  return (
       <div className = "recipe-card">
       <img src = {props.dataForCard.image} alt = {props.dataForCard.name}/>       
       <div className = "category">
           <div>{props.dataForCard.time} Mins</div>
           <div>{props.dataForCard.veg?"Veg":"Non Veg"}</div>
       </div>
       <h2>{props.dataForCard.name}</h2>
       <p dangerouslySetInnerHTML={{__html:props.dataForCard.summary}}></p>
       <button onClick={showBtnClick}>SHOW</button>
      </div>

  )
}