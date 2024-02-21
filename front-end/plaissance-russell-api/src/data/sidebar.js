import { FaTh } from "react-icons/fa";
import { MdAddChart, MdLibraryAdd, MdManageAccounts, MdContactMail  } from "react-icons/md";

const menu = [
  {
    title: "Dashboard",
    icon: <FaTh />,
    path: "/dashboardcontent",
  },
  {
    title: "Mon compte",
    icon: <MdManageAccounts />,
    childrens: [
      {
        title: "Profil",
        path: "/profile",
      },
      {
        title: "Editer Profil",
        path: "/edit-profile",
      },
    ],
  },
  {
    title: "Créer un Catway",
    icon: <MdLibraryAdd />,
    path: "/add-catway",
  },
  {
    title: "Créer une Réservation",
    icon: <MdAddChart />,
    path: "/add-reservation",
  },
  {
    title: "Signaler un Bugg",
    icon: <MdContactMail />,
    path: "/contact-us",
  },
];

export default menu;