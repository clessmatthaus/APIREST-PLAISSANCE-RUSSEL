import React from 'react'
import { useParams} from "react-router-dom"
import { useDispatch,  useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import {selectIsLoading, selectCatway, getCatway, getCatways, updateCatway } from "../../redux/features/catways/catwaySlice";
import {useEffect } from "react"
import CatwayForm from '../../components/Catway/CatwayForm/CatwayForm'
import Loader from '../../components/Loader/Loader';

const EditCatway = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {id} = useParams()
    const isLoading = useSelector(selectIsLoading);

    const catwayEdit = useSelector(selectCatway)

    const [catway, setCatway] = useState(catwayEdit)
    const [catwayImage, setCatwayImage] = useState("")
    const [imagePreview, setImagePrewiew] = useState(null)
    const [catwayState, setCatwayState] = useState("")

    useEffect(()=> {
       dispatch(getCatway(id))
    }, [dispatch, id])

    useEffect(()=> {
        setCatway(catwayEdit)

        setImagePrewiew(catwayEdit && catwayEdit.image ? `${catwayEdit.image.filePath}` : null);
        setCatwayState(catwayEdit && catwayEdit.catwayState ? catwayEdit.catwayState : "");
    }, [catwayEdit])

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCatway({...catway, [name]: value });
      };

    const handleImageChange = (e) => {
        setCatwayImage(e.target.files[0])
        setImagePrewiew(URL.createObjectURL(e.target.files[0]))
      };


    const saveCatway = async (e) => {
        e.preventDefault();
        const formData = new FormData()
        formData.append("catwayState", catwayState )
        formData.append("catwayNumber", catway?.catwayNumber)
        formData.append("type", catway?.type)
        if(catwayImage){
           formData.append("image", catwayImage) 
        }

        console.log(...formData)

        await dispatch(updateCatway({id, formData}))
        await dispatch(getCatways())
        navigate("/dashboard")
    }

    return (
        <div>
        {isLoading && <Loader />} 
        <CatwayForm  
        catway={catway}
        catwayImage={catwayImage}
        imagePreview={imagePreview}   
        catwayState={catwayState}
        setCatwayState={setCatwayState}
        handleInputChange={handleInputChange}
        handleImageChange={handleImageChange}
        saveCatway={saveCatway}
        />
        </div>
    )
}

export default EditCatway