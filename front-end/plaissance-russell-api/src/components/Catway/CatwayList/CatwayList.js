import React from 'react'
import "./CatwayList.css"
import { SpinnerImg } from "../../Loader/Loader";
import { FaRegEdit, FaEye } from "react-icons/fa";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { useState } from "react"
import Search from "../../Search/Search"
import {useEffect} from "react"
import { useDispatch, useSelector } from "react-redux"
import { FILTER_CATWAYS } from "../../../redux/features/catways/FilterSlice"
import { selectFilteredCatways } from "../../../redux/features/catways/FilterSlice"
import ReactPaginate from 'react-paginate';
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css';
import { deleteCatway, getCatways} from '../../../redux/features/catways/catwaySlice';
import { Link } from "react-router-dom"


const CatwayList = ({catways, isLoading}) => {

    const [search, setSearch] = useState('')

    const filteredCatways = useSelector(selectFilteredCatways)

    const dispatch = useDispatch()

     //delete catway 
    const delCatway = async (id) => {
      await dispatch(deleteCatway(id))
      await dispatch(getCatways())
    }
    //confirm delete catway 
    const confirmDeleteCatway = (id) => {
      confirmAlert({
        title: 'Confirmer',
        message: 'Êtes-vous sûr de supprimer cet element ?',
        buttons: [
          {
            label: 'Supprimer',
            onClick: () => delCatway(id) 
          },
          {
            label: 'Annuler',
          }
        ]
      });
    }

      //   Begin Pagination
    const [currentItems, setCurrentItems] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const itemsPerPage = 3;

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;

    setCurrentItems(filteredCatways.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(filteredCatways.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, filteredCatways]);

    const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % filteredCatways.length;
    setItemOffset(newOffset);
  };
  //   End Pagination

  useEffect(() => {
     dispatch(FILTER_CATWAYS({ catways, search}))
  }, [catways, search, dispatch])
 
  return (
    <div className="catwaylist">
       
      <hr />
      <div>
        <div className="table-content">
           <span className="searchs">
            <Search value={search} onChange={(e)=> {setSearch(e.target.value)}}/>
           </span>
        </div>
        {isLoading && <SpinnerImg/> }
        <div className="table">
           {!isLoading && catways.length === 0 ? ( <p> Auncun catway trouvé, veuillez ajouter un catway...</p>) : (
            <table>
                <thead className="t-table">
                    <tr>
                        <th>#</th>
                        <th>Numéro de catway</th>
                        <th>Type de catway</th>
                        <th className='action'><span className="voir">Voir</span> <span className="edit">Editer</span> <span className="delet">Supprimer</span></th>  
                    </tr>
                </thead>  
                <tbody className="t-body"> 
                    {currentItems.map((catway, index) => {
                            const {_id, catwayNumber, type} = catway;
                            return (
                              <tr key={_id} className='bg-items'>
                                    <td>{index + 1}</td>
                                    <td>{catwayNumber}</td>
                                    <td>{type}</td>
                                    <td>
                                        <td className="icons">
                                            <span>
                                              <Link to={`/catway-detail/${_id}`}>
                                                <FaEye size={22} color={"blue"} />
                                              </Link>
                                            </span>
                                            <span>
                                            <Link to={`/edit-catway/${_id}`}>
                                                <FaRegEdit size={22} color={"green"}/>
                                              </Link>
                                            </span>
                                            <span>
                                                <RiDeleteBin5Fill size={22} color={"red"} onClick={() => confirmDeleteCatway(_id)}/>
                                            </span>
                                        </td>
                                    </td>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </table>
           )}
        </div>

        <ReactPaginate
          breakLabel="..."
          nextLabel="Suivant"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          pageCount={pageCount}
          previousLabel="Precedant"
          renderOnZeroPageCount={null}
          containerClassName="pagination"
          pageLinkClassName="page-num"
          previousLinkClassName="page-num"
          nextLinkClassName="page-num"
          activeLinkClassName="activePage"
        />

      </div>
    </div>
  )
}

export default CatwayList
