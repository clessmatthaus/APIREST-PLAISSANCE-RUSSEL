import React from 'react'
import home from '../styles/home.css'
import logo from '../components/Nav/logo-apis.png'
import newspaper from './newspaper.svg'
import russell from './russell2.png'
import Index from '../components/Log/index';

const Home = () => {
  return (
    <div className="home-block">
        <div className="home-container">
        <div className='header-container'>
          <img src={logo} className="logo1" alt=''/>
        </div>
        <div className="api-doc">
        <img src={newspaper} className="docIcon" alt=''/>
        <span> API Documentation</span>
        </div>
      </div>
      <div className="home">
      <div className='log'>
        <Index />
      </div>
      <div className='presentation-container'>
      <img src={russell} className="russel" alt=''/>
        <div className='presentation'>
          <h2>Le Port de Plaisance Russell</h2>
          <p>On sait depuis longtemps que travailler avec du texte lisible et contenant du sens est source de distractions, et empêche de se concentrer sur la mise en page elle-même. L'avantage du Lorem Ipsum sur un texte générique comme 'Du texte. Du texte. Du texte.' est qu'il possède une distribution de lettres plus ou moins normale, et en tout cas comparable avec celle du français standard. De nombreuses suites logicielles de mise en page ou éditeurs de sites Web ont fait du Lorem Ipsum leur faux texte par défaut, et une recherche pour 'Lorem Ipsum' vous conduira vers de nombreux sites qui n'en sont encore qu'à leur phase de construction. Plusieurs versions sont apparues avec le temps, parfois par accident, souvent intentionnellement (histoire d'y rajouter de petits clins d'oeil, voire des phrases embarassantes)</p>
         <div className='btn-links'><span className='btns'>Le lien vers la documention de l'API</span></div> 
        </div>
      </div>
      </div>
    </div>
  )
}

export default Home;
