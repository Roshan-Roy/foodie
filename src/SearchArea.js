import React,{useState,useRef,useEffect} from 'react';
import FilterOptions from './FilterOptions';
import Loading from './Loading';
import RecipeCard from './RecipeCard';
import Details from './Details';
import Error1 from './Error1';

export default function SearchArea(props){
 
  let [filterBox,updateFilter] = useState(false);
  let [detailedBox,updateDetailed] = useState(false);
  let [detailedData,updateDetailedData] = useState();
  let [noConnection,updateConnection] = useState();
  
  let [API,changeKey] = useState("https://api.spoonacular.com/recipes/complexSearch?apiKey=ecd557467a374e1e9fbe8c9a21950795&number=100&addRecipeInformation=true");

  let [filterDetails,updateDetails] = useState({
    cuisine:"All",
    listOfCuisines:["All","African","American","British","Cajun","Carribean","Chinese","East European","European","French","Greman","Greek","Indian","Irish","Italian","Japanese","Jewish","Korean","Latin American","Mediterranean","Mexican","Middle Eastern","Nordic","Southern","Spanish","Thal","Vietnamese"],
    type:"All",
    listOfTypes:["All","Main course","Side dish","Dessert","Appetizer","Salad","Bread","Breakfast","Soup","Beverage","Sauce","Marinade","Finger Food","Snack","Drink"]
  });
  let [fetched,updateFetched] = useState();
  let [currentList,updateList] = useState([]);
  let searchBoxRef = useRef();
  
  const fetchData = (cuisine,type,query) =>  {
   let apiKey = "https://api.spoonacular.com/recipes/complexSearch?apiKey=ecd557467a374e1e9fbe8c9a21950795&number=100&addRecipeInformation=true";
   if(cuisine!=="All")
     apiKey += `&cuisine=${cuisine.toLowerCase().replace(/\s/,"+")}`;
   if(type!=="All")
     apiKey += `&type=${type.toLowerCase().replace(/\s/,"+")}`;
   if(query!=="")
    apiKey += `&query=${query.toLowerCase().replace(/\s/,"+")}`;
   changeKey(apiKey);
  }
  
  const modifyData = (obj) => {
    return obj.results.map(e => {
      return {
        name:e.title,
        veg:e.vegetarian,
        id:e.id,
        time:e.readyInMinutes,
        image:e.image,
        summary:e.summary,
        index:Math.random()
      }
    }).sort((a,b) => a.index-b.index);
  }
  
  useEffect(() => {
    searchBoxRef.current.focus();
  },[]);
  
  useEffect(() => {
   window.scrollTo(0,0);
   updateFetched(false);
   updateConnection(false);
    fetch(API).then(response => response.json()).then((data) => {
      updateList(modifyData(data));
      updateFetched(true);
   }).catch(() => {
      updateConnection(true);
   })
  },[API]);
  
  const handleRadioChangeCuisine = (val) => {
    updateDetails({...filterDetails,cuisine:val})
  }
  const handleRadioChangeType = (val) => {
    updateDetails({...filterDetails,type:val})
  }
  const handleFilterButtonClick = () => {
    updateFilter(true);
    document.body.style.overflow="hidden";
  }
  const closeFilterButtonClick = () => {
    updateFilter(false);
    document.body.style.overflow="visible";
  }
  const handleHomeBtnClick = () => {
    props.f1();
  }
  const showDetails = (detailedData) => {
    updateDetailedData(detailedData);
    updateDetailed(true);
    document.body.style.overflow="hidden";
  }
  const closeDetailed = () => {
    updateDetailed(false);
    document.body.style.overflow="visible";
  }
 
  const performSearchOnEnter = (e) => {
     if(e.key === "Enter"){
       fetchData(filterDetails.cuisine,filterDetails.type,searchBoxRef.current.value);
       searchBoxRef.current.blur();
     }
  }
  const performSearchOnClick = () => {
    fetchData(filterDetails.cuisine,filterDetails.type,searchBoxRef.current.value);
  }
 
  return(
  <>
  <section  className = "search-bar">
  <div className = "container">
  <button className = "home-btn" onClick = {handleHomeBtnClick}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
</svg>
</button>
 <input name="searchInp" type = "search" placeholder = "Search" ref = {searchBoxRef} onKeyPress = {performSearchOnEnter}/>
 <button className = "filter-open" onClick = {handleFilterButtonClick}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
</svg>
</button>
</div>
</section>
<section className = "search-list">
  {fetched?currentList.length===0?<Error1 msg = "No Results Found"/>:currentList.map(e => <RecipeCard dataForCard = {e} key = {e.id} f1 = {showDetails}/>):noConnection?<Error1 msg = "Connection Lost"/>:<div className = "loading-container-1">
     <Loading/>
   </div>}
</section>
{filterBox?<FilterOptions f1={closeFilterButtonClick} f2={handleRadioChangeCuisine} f3={handleRadioChangeType} f4 = {performSearchOnClick} filterDetails={filterDetails}/>:null}
{detailedBox?<Details data={detailedData} f1={closeDetailed}/>:null}
</>
  );
}