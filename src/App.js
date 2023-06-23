import React,{useState} from 'react';
import './App.css';
import HomePage from './HomePage';
import SearchArea from './SearchArea';

export default function App() {
  
  let [home,update] = useState(true);
  
  const toggleBool = () => {
    home?update(false):update(true);
  }
  
  return (
    <>
    {home?<HomePage f1 = {toggleBool}/>:<SearchArea f1 = {toggleBool}/>}
    </>
  );
}
