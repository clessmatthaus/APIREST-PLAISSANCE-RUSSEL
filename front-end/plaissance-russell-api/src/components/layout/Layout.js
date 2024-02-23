import Header from "../Nav/Header";
import React from 'react'
import Footer from "../Footer/Footer";
import layout from "./Layout.css"
import AddCatway from "../../pages/Catway/AddCatway"


const Layout = ({ children }) => {
  return (
   
    <div> 
     <Header/>
        <div className="content">
           {children}
        </div>  
     <Footer/>
    </div>
    
  )
}

export default Layout
