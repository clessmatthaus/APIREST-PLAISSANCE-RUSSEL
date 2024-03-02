import React from 'react'
import "./Profile.css"
import { useNavigate } from "react-router-dom";
import { useState, useEffect} from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import Loader from '../../components/Loader/Loader';
import { selectUser } from '../../redux/features/auth/authSlice';
import { toast } from 'react-toastify';


const EditProfile = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false)
    const user = useSelector(selectUser)
    const {email} = user

    useEffect(() => {
        if(!email){
            navigate("/profile")
        }
    }, [email, navigate])

    const initialState = {
       name: user?.name,
       email: user?.email,
       photo: user?.photo
    };

    const [profile, setProfile] = useState(initialState);
    const [profileImage, setProfileImage] = useState("");

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfile({...profile, [name]: value });
      };

    const handleImageChange = (e) => {
        setProfileImage(e.target.files[0])
    };

    const saveProfile = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        try{
        // handle image upload
        let imgURL;
        if( profileImage && 
        ( 
          profileImage.type === "image/jpeg" || 
          profileImage.type === "image/jpg" || 
          profileImage.type === "image/webp" || 
          profileImage.type === "image/png"
          )
        )
        {
           const image = new FormData()
           image.append("file", profileImage)
           image.append("cloud_name", "clessmatthaus")
           image.append("upload_preset", "upfhgnj3")

           //fetch image to cloudinary
           const response = await fetch("https://api.cloudinary.com/v1_1/clessmatthaus/image/upload",
           { method: "post", body: image }
           );
           const imageData = await response.json();
           imgURL = imageData.url.toString();

        }
        } catch (error) {
            console.log(error)
           setIsLoading(false)
           toast.error(error.message)
        }

    };
    return (
    <div className="editprofile">
        {isLoading && <Loader />}
        <div className="edits-profile">
            <div className="edit-profile-img"> <img src={user?.photo} alt="profil" width="200px" height="150px"/></div>            
            <form className='edit-profile-infos' onSubmit={saveProfile}>
                <h5>
                    <label>Nom: </label><br/>
                    <input type="text" name="name" value={profile?.name} onChange={handleInputChange} className="color-input"/>
                </h5>
                <h5>
                    <label>E-mail: </label>
                    <br/><input type="email" name="email" value={profile?.email} disabled className="color-input" />
                </h5>       
                <code>L'e-mail ne peut pas être modifié</code>
                <div className="update-photo">
                <h5><label>Photo:</label><br/>
                    <input className="color-lab" type="file" name="image" onChange={handleImageChange} />
                </h5>
                </div>
                <div className="send-btn">
                   <Link to="/profile"><button className="btn btn-primary">Enregister les modifications</button></Link>
                </div>
                
          </form>
        </div>
     </div>
    )
};

export default EditProfile