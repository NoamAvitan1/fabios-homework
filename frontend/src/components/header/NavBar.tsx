import React, { useContext } from 'react'
import { ThemeContext } from '../../App';
import './NavBar.css'
import { BsMoonStars } from "react-icons/bs";
import { IoSunnyOutline } from "react-icons/io5";
import { PiMoonStarsThin } from "react-icons/pi";


export const NavBar = () => {
    const themeContext = useContext(ThemeContext);
    if(!themeContext) return;
    const {theme,changeTheme} = themeContext;
  return (
    <div className='NavBar'>
      <img className='Fabios-Image' src="https://fabios.io/wp-content/uploads/2022/06/logo.png" alt="" />
      <button className='changeTheme-btn' onClick={()=>changeTheme()}>{theme === 'dark' ? <PiMoonStarsThin/> : <IoSunnyOutline/>}</button>
    </div>
  )
}
