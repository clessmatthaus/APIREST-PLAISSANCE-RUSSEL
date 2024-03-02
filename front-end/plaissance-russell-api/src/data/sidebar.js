import { FaTh } from "react-icons/fa";
import { MdAddChart, MdLibraryAdd, MdManageAccounts, MdContactMail  } from "react-icons/md";

const menu = [
  
  {
    title: "Compte",
    icon: <MdManageAccounts size={35}/>,
    childrens: [
      {
        title: "Profil",
        path: "/profile",
      },
      {
        title: "Editer Profil",
        path: "/edit-profile",
      }
    ],
  },
  {
    title: "Dashboard",
    icon: <FaTh  size={30}/>,
    path: "/dashboard",
  },
  {
    title: "Créer un Catway",
    icon: <MdLibraryAdd size={30}/>,
    path: "/add-catway",
  },
  {
    title: "Créer une Réservation",
    icon: <MdAddChart size={30}/>,
    path: "/add-reservation",
  },
  {
    title: "Signaler un Bugg",
    icon: <MdContactMail size={30}/>,
    path: "/contact-us",
  },
];

export default menu;