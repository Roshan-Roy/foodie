import React,{useState,useEffect,useRef} from 'react';
import data from './homedata.json';
import images from './imageList.json';

export default function HomePage(props){

  let [quote,update] = useState();
  let homePageDiv = useRef();
  
  useEffect(() => {
    update(data[Math.floor(Math.random() * data.length)].quote);
    homePageDiv.current.style.backgroundImage=`linear-gradient(rgba(0,0,0,0.8),rgba(0,0,0,0.8)),url("${require(`./${images[Math.floor(Math.random() * images.length)].src}`)}")`;
  },[])
  
  const handleSearchBtnClick = () => {
    props.f1();
  }
  
  return (
    <div ref={homePageDiv} className="home-page">
    <p>Search recipies with</p>
    <h1>Foodie</h1>
    <h3>"{quote}"</h3>
    <button onClick = {handleSearchBtnClick}>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
</svg>
</button>
    </div>
  )
}
