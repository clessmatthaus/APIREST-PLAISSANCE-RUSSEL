
import React from 'react'
import CatwayForm from '../../components/CatwayForm/CatwayForm'
import { useState } from "react"
import { useSelector } from "react-redux"
import {createCatway, selectIsLoading,} from "../../redux/features/catways/catwaySlice";
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import Loader from '../../components/Loader/Loader';


const initialState = {
    catwayNumber: "",
    type: "",
}


const AddCatway = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [catway, setCatway] = useState(initialState)
    const [catwayImage, setCatwayImage] = useState("")
    const [imagePreview, setImagePrewiew] = useState(null)
    const [catwayState, setCatwayState] = useState("")

    const isLoading = useSelector(selectIsLoading);

    const {catwayNumber, type} = catway;

    const handleInputChange = (e) => {
        const { catwayNumber, value } = e.target;
        setCatway({...catway, [catwayNumber]: value });
      };

    const handleImageChange = (e) => {
        setCatwayImage(e.target.files[0])
        setImagePrewiew(URL.createObjectURL(e.target.files[0]))
      }
    const saveCatway = async (e) => {
        e.preventDefault();
        const formData = new FormData()
        formData.append("catwayNumber", catwayNumber)
        formData.append("type", type)
        formData.append("catwayState", catwayState )
        formData.append("image", catwayImage )

        console.log(...formData)

        await dispatch(createCatway(formData))

        navigate("/dashboard")
    }
    
  return (
    <div>
      {isLoading && <Loader />} 
        <CatwayForm  
        catwayImage={catwayImage}
        imagePreview={imagePreview} 
        catwayNumber={catwayNumber} 
        type={type}
        catwayState={catwayState}
        setCatwayState={setCatwayState}
        handleInputChange={handleInputChange}
        handleImageChange={handleImageChange}
        saveCatway={saveCatway}
        />
        
    </div>
  )
}

export default AddCatway
