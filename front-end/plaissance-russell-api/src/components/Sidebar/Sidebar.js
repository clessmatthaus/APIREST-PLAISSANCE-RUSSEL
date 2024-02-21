import React from 'react'
import "./Sidebar.css"
import { TbMenuDeep } from "react-icons/tb";
import menu from "../../data/sidebar"
import SidebarItems from "./SidebarItems"



function Sidebar() {
  return (
    <div className='sidebar'>
        <div className="sidebar-content">

        <div className="top-section">
        <div className="menu-icon"><TbMenuDeep size={30}/></div>
        </div>
               
        </div>
        <div>
            <main>

            </main>
        </div>
     
    </div>
  )
}

export default Sidebar