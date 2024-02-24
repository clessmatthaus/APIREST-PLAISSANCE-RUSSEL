import React from 'react'
import catwayList from "./CatwayList.css"
import { SpinnerImg } from "../../Loader/Loader";
import { FaRegEdit, FaEye } from "react-icons/fa";
import { RiDeleteBin5Fill } from "react-icons/ri";

const CatwayList = ({catways, isLoading}) => {

  const shortenText = (text, n) => {
    if(text.length > n){
        const shortenedText = text.substring(0, n).concat("...")
        return shortenedText 
    }
    return text
  }

  return (
    <div className="catwaylist">
        <h1>Tableau de bord</h1>
      <hr />
      <div>
        <div className="table-content">
           <span>
            <h4>Gestion de catways</h4>
           </span>
           <span >
            <h4>Recherche un catway</h4>
           </span>
        </div>
        {isLoading && <SpinnerImg/> }
        <div className="table">
           {!isLoading && catways.length === 0 ? ( <p> Auncun catway trouvé, veuillez ajouter un catway...</p>) : (
            <table>
                <thead className="t-table">
                    <tr>
                        <th>s/n</th>
                        <th>Numéro de catway</th>
                        <th>Type de catway</th>
                        <th className='action'>Action</th>
                    </tr>
                </thead>  
                <tbody className="t-body">
                    {
                        catways.map((catway, index) => {
                            const {_id, catwayNumber, type} = catway
                            return (
                                <tr key={_id} className='bg-items'>
                                    <td>{index + 1}</td>
                                    <td>{catwayNumber}</td>
                                    <td>{type}</td>
                                    <td>
                                        <td className="icons">
                                            <span>
                                            <FaEye size={24} color={"blue"}/>
                                            </span>
                                            <span>
                                                <FaRegEdit size={24} color={"green"}/>
                                            </span>
                                            <span>
                                                <RiDeleteBin5Fill size={24} color={"red"}/>
                                            </span>
                                        </td>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
           )}
        </div>

      </div>
    </div>
  )
}

export default CatwayList
