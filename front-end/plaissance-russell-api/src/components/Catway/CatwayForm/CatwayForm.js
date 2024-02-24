import React from 'react'
import catwayForm from "./CatwayForm.css"
import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import imgpr from "./long.jpg"

const CatwayForm = ({catway, catwayNumber, catwayImage, imagePreview, type ,catwayState ,setCatwayState,  handleInputChange,
  handleImageChange, saveCatway}) => {
  return (
    <div className="cat-form">
    
     <div className="cards">    
        <form onSubmit={saveCatway}>
          <div className="group">
            <h3>Enregistrer un catway</h3>
             
             <input type="file" name="image" onChange={(e) => handleImageChange(e)}/>
             {imagePreview != null ? (
              <div className="image-preview">
                <img src={imagePreview} alt="catway" width="300px"/>
              </div>
             ) : (<p>Aucune image définie pour ce modèle.</p>)}
          </div>
          <label>Numéro du Catway : </label>
          <input type="number" placeholder="numéro du catway" name="catwayNumber" value={catway?.catwayNumber} onChange={handleInputChange} className="inputse"/>
          <label>Type du Catway : </label>
          <input type="text" placeholder="le type du Catway" name="type" value={catway?.type} onChange={handleInputChange} className="inputse"/>
          <div className="textzone">
          <label>Déscription du Catway :</label>
          <ReactQuill theme="snow" value={catwayState} onChange={setCatwayState} modules={CatwayForm.modules} formats={CatwayForm.formats} className="textzone1"/>
          </div>   
          <div className='save-btn'><button type='submit' className='btn btn-secondary'>Enregistrer</button></div>
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
