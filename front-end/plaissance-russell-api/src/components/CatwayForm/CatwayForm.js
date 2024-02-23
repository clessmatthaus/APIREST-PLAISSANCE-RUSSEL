import React from 'react'
import catwayForm from "./CatwayForm.css"
import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Card from "../Card/Card"
import imgpr from "./long.jpg"

const CatwayForm = ({catwayNumber, catwayImage, imagePreview, type ,catwayState ,setCatwayState,  handleInputChange,
  handleImageChange, saveCatway}) => {
  return (
    <div className="cat-form">
    
     <div className="cards">    
        <form onSubmit={saveCatway}>
          <div className="group">
             <label>Image Catway</label>
             <input type="file" name="image" onChange={(e) => handleImageChange(e)}/>
             {imagePreview != null ? (
              <div className="image-preview">
                <img src={imagePreview} alt="image catway" width="500px"/>
              </div>
             ) : (<p>Aucune image définie pour ce modèle.</p>)}
          </div>
          <label>Numéro du Catway : </label>
          <input type="text" placeholder="numéro du catway" name="catwayNumber" value={catwayNumber} onChange={(e) => handleInputChange} className="inputse"/>
          <label>Type du Catway : </label>
          <input type="number" placeholder="le type du Catway" name="type" value={type} onChange={(e) => handleInputChange} className="inputse"/>
          <div>
          <label>Déscription du Catway :</label>
          <ReactQuill theme="snow" value={catwayState} onChange={setCatwayState}className="textzone"/>
          </div>
        </form>
     </div>
     
    </div>
  )
}

CatwayForm.modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ align: [] }],
    [{ color: [] }, { background: [] }],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["clean"],
  ],
};
CatwayForm.formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "color",
  "background",
  "list",
  "bullet",
  "indent",
  "link",
  "video",
  "image",
  "code-block",
  "align",
];

export default CatwayForm
