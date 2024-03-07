import React from 'react'
import "./Profile.css"
import { useNavigate } from "react-router-dom";
import { useState, useEffect} from "react"
import { useSelector } from "react-redux"
import Loader from '../../components/Loader/Loader';
import ChangePassword from '../../components/ChangePassword/ChangePassword';
import { selectUser } from '../../redux/features/auth/authSlice';
import { toast } from 'react-toastify';
import { updateUser } from '../../services/authServices';
import Card from "../../components/Card/Card";


const EditProfile = () => {

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const user = useSelector(selectUser);
  const { email } = user;

  useEffect(() => {
    if (!email) {
      navigate("/profile");
    }
  }, [email, navigate]);

  const initialState = {
    name: user?.name,
    email: user?.email,
    photo: user?.photo,
  };
  const [profile, setProfile] = useState(initialState);
  const [profileImage, setProfileImage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleImageChange = (e) => {
    setProfileImage(e.target.files[0]);
  };

  const saveProfile = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // Handle Image upload
      let imageURL;
      if (
        profileImage &&
        (profileImage.type === "image/jpeg" ||
          profileImage.type === "image/jpg" ||
          profileImage.type === "image/png" ||
          profileImage.type === "image/webp")
      ) {
        const image = new FormData();
        image.append("file", profileImage);
        image.append("cloud_name", "dxws5o1rg")
        image.append("upload_preset", "rfpfg4ug")

        // First save image to cloudinary
        const response = await fetch(
          "https://api.cloudinary.com/v1_1/dxws5o1rg/image/upload",
          { method: "post", body: image }
        );
        const imgData = await response.json();
        imageURL = imgData.url.toString();

        // Save Profile
        const formData = {
          name: profile.name,
          photo: profileImage ? imageURL : profile.photo,
        };

        const data = await updateUser(formData);
        console.log(data);
        toast.success("Mise à jour effectuée avec succès");
        navigate("/profile");
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      toast.error(error.message);
    }
  };

    return (
    <div className="editprofile">
        {isLoading && <Loader />}
      <Card cardClass={"Card --flex-dir-column"}>
        <div className="edits-profile">
            <div className="edit-profile-img"> 
                <img src={user?.photo} alt="profil" width="150px" height="150px"/>
            </div>           
            <form onSubmit={saveProfile} className='edit-profile-infos'>
              <div className='input-container'> 
                <h5>
                    <label>Nom: </label><br/>
                    <input 
                     type="text"
                     className='color-input' name="name"
                     value={profile?.name}
                     onChange={handleInputChange}
                    />
                </h5>
                <h5>
                    <label>E-mail: </label>
                    <br/>
                    <input type="text" name="email" value={profile?.email} disabled className='color-input'/>
                </h5>       
                <code>L'e-mail ne peut pas être modifié</code>
                <div className="update-photo">
                <h5><label>Photo:</label><br/>
                <input type="file" name="image" onChange={handleImageChange} className='color-lab'/>
                </h5>
                </div>
                <div className="send-btn">
                  <button className="btn btn-primary">Enregister les modifications</button>
                </div>
              </div>
            </form>
        </div>
        </Card>
        <ChangePassword />
     </div>
    )
};

export default EditProfile