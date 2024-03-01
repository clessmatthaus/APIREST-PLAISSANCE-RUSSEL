import React from 'react'
import './CatwayDetail.css'
import UseRedirectLogOut from "../../../HookDirection/useRedirectLogOut"
import { useDispatch, useSelector } from "react-redux"
import { useParams} from "react-router-dom"
import {useEffect } from "react"
import { selectIsLoggedIn } from "../../../redux/features/auth/authSlice";
import {getCatway} from "../../../redux/features/catways/catwaySlice";
import { SpinnerImg } from "../../Loader/Loader";
import DOMPurify from "dompurify";

const CatwayDetail = () => {
    UseRedirectLogOut("/")
    const dispatch = useDispatch()

    const {id} = useParams()

    const isLoggedIn = useSelector(selectIsLoggedIn);
    const {catway, isLoading, isError, message} = useSelector((state) => state.catway)
    const availableStatus = (quantity) => {
      if(quantity > 0){
         return <span className="nodispo">Non disponible</span>
      }
      return <span className="dispo">disponible</span>
    }
    
  
    useEffect(() => {
      if (isLoggedIn === true) {
        dispatch(getCatway(id))
        //console.log(catway);
      }

      if(isError) {
        console.log(message)
      }
    }, [isLoggedIn, isError, message, dispatch, catway])

  return (
    <>
     
    <div className='card'>
         {catway && (
        <div className="catwayDetail">
         <div className="card-imgs">
            {catway?.image ?(
                <img src={catway.image.filePath} alt={catway.image.fileName} width="100%" height="100%"/>
            ): ( <p>Pas d'image pour ce catway</p> )}
         </div> 
       
         <div className="card-desc">
           <h2 className="styles-title">Catway N° {catway.catwayNumber} {availableStatus(catway.quantity)} </h2>
           <div className="desc-caract">
              <div className="details">
                <h4 className="styles-title">Caractéristiques</h4>
                <div className="materiau">
                    <h5 className="styles-title">Type</h5>
                    <p className="styles-p">{catway.type}</p>
                </div>
              </div>
              <div className="details">
                <h4 className="styles-title">Description</h4>
                <div dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(catway.catwayState)
                }}/>
              </div> 
              <hr />
              <div className="timestamp">
              <code className="dark">Créer le: {catway.createdAt.toLocaleString("fr-FR", {timeZone: 'UTC'})}</code>
              <code>Modifier le: {catway.updatedAt.toLocaleString("fr-FR", {timeZone: 'UTC'})}</code> 
              </div>
           </div>
         </div> 
      </div>   
      )}
    </div>
   
    </>
  )
}

export default CatwayDetail
