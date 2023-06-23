import React,{useState,useEffect} from 'react';
import Loading from './Loading';
import DetailsBox from './DetailsBox';
import Error2 from './Error2';

export default function Details(props){
  let [result,updateResult] = useState(false);
  let [data,setData] = useState();
  let [noConnection,updateConnection] = useState();
  
  const detailedBackClick = (e) => {
    if(e.target.className === "details-back")
     props.f1();
  }
  const closeBtnClick = () => {
    props.f1();
  }
  
  const extractData = (e) => {
    const extractItems = (arr) => {
     let currentList = [];
     arr.forEach(e => {
       e.forEach(i => {
         if(!currentList.includes(i.name)) currentList.push(i.name);
       })
     })
     return currentList;
    }
    
    return{
      ...props.data,
      steps:e.map(e=>e.step),
      equipments:extractItems(e.map(e=>e.equipment).filter(e => e.length!==0)),
      ingredients:extractItems(e.map(e=>e.ingredients).filter(e => e.length!==0))
    }
  }
  
  useEffect(() => {
    fetch(`https://api.spoonacular.com/recipes/${props.data.id}/analyzedInstructions?apiKey=ecd557467a374e1e9fbe8c9a21950795`).then(response => response.json()).then(msg => {
        setData(extractData(msg[0].steps));
        updateResult(true);
    }).catch((msg) => {
      updateConnection(true);
    })
    //eslint-disable-next-line
  },[]);
  
  return (
   <div onClick = {detailedBackClick} className="details-back">
  {result?<DetailsBox detailsData={data} f1 = {closeBtnClick}/>:noConnection?<Error2/>:
   <div className = "loading-container-2">
   <Loading/>
   </div>}
   </div>
  )
}
