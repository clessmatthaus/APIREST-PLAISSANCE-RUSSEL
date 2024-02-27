import React from 'react'
import catwayList from "./CatwayList.css"
import { SpinnerImg } from "../../Loader/Loader";
import { FaRegEdit, FaEye } from "react-icons/fa";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { useState } from "react"
import Search from "../../Search/Search"
import {useEffect} from "react"
import { useDispatch, useSelector } from "react-redux"
import { FILTER_CATWAYS } from "../../../redux/features/catways/FilterSlice"
import { selectFilteredCatways } from "../../../redux/features/catways/FilterSlice"
import ReactDOM from 'react-dom';
import ReactPaginate from 'react-paginate';


const CatwayList = ({catways, isLoading}) => {

    const [search, setSearch] = useState('')

    const filteredCatways = useSelector(selectFilteredCatways)

    const dispatch = useDispatch()

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
                                            <FaEye size={22} color={"blue"}/>
                                            </span>
                                            <span>
                                                <FaRegEdit size={22} color={"green"}/>
                                            </span>
                                            <span>
                                                <RiDeleteBin5Fill size={22} color={"red"}/>
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
