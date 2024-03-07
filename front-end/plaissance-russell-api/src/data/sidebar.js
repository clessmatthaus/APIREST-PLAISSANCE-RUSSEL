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
    title: "Liste de Catways",
    icon: <FaTh  size={30}/>,
    path: "/dashboard",
  },
  {
    title: "Créer un Catway",
    icon: <MdLibraryAdd size={30}/>,
    path: "/add-catway",
  },
  {
    title: "Liste de reservations",
    icon: <FaTh  size={30} color={"green"}/>,
    path: "/reservation",
  },
  {
    title: "Créer une Réservation",
    icon: <MdAddChart size={30} color={"green"}/>,
    path: "/add-reservation",
  },
];

export default menu;