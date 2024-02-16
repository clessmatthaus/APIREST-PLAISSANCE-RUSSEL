import React from 'react'
import Header from '../components/Nav/Header'
import dashboard from '../styles/dashboard.css'
import userIcon from '../components/Nav/user-solids.svg'

function Dashboard() {
  return (
    <div className='dashboards'>
      <Header/>
      <section className="aside-left">
        <div className="status-profil">
          <img src={userIcon} className="status-icon" alt=''/>
          <h5>Admin : </h5>
        </div>
        <h4>Gestion des taches</h4>
        <div className="settings">
          <div className="gestion-title"><h5>Gestion utilisateur</h5></div>
          <ul>
            <li> Créer un utilisateur</li>
            <li> modifier infos d'un utilisateur</li>
            <li> Supprimer un utilisateur</li>
          </ul>
        </div>
        <div className="settings">
        <div className="gestion-title"><h5>Gestion des Catways</h5></div>
        
          <ul>
            <li> Créer un catway</li>
            <li> modifier l'etat d'un catway</li>
            <li> Supprimer un catway</li>
            <li> Afficher les détails d'un catway</li>
          </ul>
        </div>
        <div className="settings">
        
        <div className="gestion-title"><h5>Gestion des réservations de Catways</h5></div>
          <ul>
            <li> Enregistrer une réservation</li>            
            <li> Supprimer un réservation</li>
            <li> Afficher les détails d'une réservation</li>
          </ul>
        </div>
      </section>
    </div>
  )
}

export default Dashboard
