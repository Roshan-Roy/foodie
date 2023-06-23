import React from 'react';

export default function FilterOptions(props){
  
  const handleCloseBtnClick = () => {
    props.f1();
  }
  const handlefilterBackClick = (e) => {
    if(e.target.className === "filter-back")
      props.f1();
  }
  const handleSearchBtnClick = () => {
    props.f4();
    props.f1();
  }
  const handleCuisineChange = (e) => {
    props.f2(e.target.value);
  }
  const handleTypeChange = (e) => {
    props.f3(e.target.value);
  }
  
  return (
    <div className = "filter-back" onClick = {handlefilterBackClick}>
            <div className = "filter-box">
               <p><b>Cuisine : </b>{props.filterDetails.cuisine}</p> 
               <div>
               {
                 props.filterDetails.listOfCuisines.map(e => {
                   return <React.Fragment key = {e}><input type = "radio" name = "cuisines" id = {e} value = {e} onChange = {handleCuisineChange}checked={e===props.filterDetails.cuisine}
                   /><label htmlFor = {e}>{e}</label></React.Fragment>
                 })
               }
               </div>
               <p><b>Type : </b>{props.filterDetails.type}</p> 
               <div>
               {
                 props.filterDetails.listOfTypes.map(e => {
                   return <React.Fragment key = {e}><input type = "radio" name = "types"  id = {e==="All"?"all":e} value = {e} onChange = {handleTypeChange} checked={e===props.filterDetails.type}/><label htmlFor = {e==="All"?"all":e}>{e}</label></React.Fragment>
                 })
               }
               </div>
               <button className = "search-btn" onClick = {handleSearchBtnClick}>Search</button>
               <button className = "close-btn-filter" onClick = {handleCloseBtnClick}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
</svg>
</button>
            </div>
        </div>
    )
}
