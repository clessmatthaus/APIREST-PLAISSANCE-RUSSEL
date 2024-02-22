import React from 'react';
import loading from "./loadings.gif";
import ReactDom from "react-dom";
import load from "./Loader.css";

function Loader() {
  return ReactDom.createPortal(
    <div className='section'>
        <div className='loading'>
           <img src={loading} alt="loading..." />
        </div>
    </div>,
    document.getElementById('loader')
  )
}

    export const SpinnerImg = () => {
      return (
        <div className="imgblock">
            <img src={loading} className="imgl" alt="loading..." />
        </div>
      )
    }

export default Loader
