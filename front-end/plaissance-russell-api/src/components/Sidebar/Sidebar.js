import React from 'react'
import "./Sidebar.css"
import { TbMenuDeep } from "react-icons/tb";
import menu from "../../data/sidebar"
import SidebarItems from "./SidebarItems"
import { useState } from 'react';
import { useNavigate } from "react-router-dom"



function Sidebar() {

  const [isOpen, setIsOpen] = useState(true);
  const toggle = () => setIsOpen(!isOpen);
  const navigate = useNavigate()

  //const goToHome = () => {
    //navigate("/")
  //}
  return (
    <div className='sidebar'style={{width: isOpen ? "345px" : "200px"}}>
        <div className="sidebar-content">

        <div className="top-section">
        <div className="menu-icon" style={{marginRight: isOpen ? "0px" : "50px"}}>
         
          <TbMenuDeep size={30} onClick={toggle}/>
        </div>
        </div>
            {menu.map((item, index) => {
              return <SidebarItems  key={index} item={item} isOpen={isOpen}/>
            })}   
        </div>
        
        <div>
            <main style={{paddingLeft: isOpen ?  "345px" : "200px", transition: "all .5s"}}>
               
            </main>
        </div>
     
    </div>
  )
}

export default Sidebar