import React, { useState } from 'react'
import "./Sidebar.css"
import { MdKeyboardArrowRight } from "react-icons/md"
import { NavLink } from 'react-router-dom';

const activeLink = ({isActive}) => (isActive ? "active" : "link")
const activeSubLink = ({isActive}) => (isActive ? "active" : "link")


function SidebarItems({item, isOpen}) {

  const [expandMenu, setExpandMenu] = useState(false)

  if(item.childrens){
     return (
     <div className={expandMenu ? "sidebar-item sidebar-parent open" : "sidebar-item sidebar-parent "}>
      <div className='sidebar-title'>
        <span>
          {item.icon && <div className='icons'>{item.icon}</div>}
          {isOpen && <div>{item.title}</div>}
        </span>
        <MdKeyboardArrowRight size={24} 
        className='arrow-icon' 
        onClick={() => setExpandMenu(!expandMenu)}/>
      </div>

      <div className='s-content'>
          {item.childrens.map((child, index) => {
            return (
              <div key={index} className='s-child'>
                <NavLink to={child.path} activeClassName={activeSubLink} className="a">
                  <div className='sidebar-item a'>
                      <div className='sidebar-title '>
                      
                        {child.icon && <div className='icon b'>{child.icon}</div>}
                        {isOpen && <div>{child.title}</div>}
                        
                      </div>
                  </div>
                </NavLink>

              </div>
            )
          })}
      </div>

      </div>
      );
  } else { return(
    <NavLink to={item.path} activeClassName={activeLink} className="a">
      <div className='sidebar-item s-parent a'>
          <div className='sidebar-title '>
            <span>
              {item.icon && <div className='icon b'>{item.icon}</div>}
              {isOpen && <div>{item.title}</div>}
            </span>
          </div>
      </div>
    </NavLink>
    )
  }
 
}

export default SidebarItems