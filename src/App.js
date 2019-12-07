import React from 'react';
import { Router } from '@reach/router';
import './App.css';
import SvgEditor from './SvgEditor';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx'
import Blog from './pages/Blog.jsx'
import Home from './pages/Home.jsx'
import Portfolio from './pages/Portfolio.jsx'
import ResponsiveNavigation from './components/ResponsiveNavigation.jsx';
import siblogo from './images/siblogo.png'
import logo from './images/three-line.png'

function App() {
  
  const navLinks = [
    {
      text: 'Объекты учета',
      path: '/',
      icon: 'ion-ios-home'
    },
    {
      text: 'Мнемосхемы',
      path: '/contact',
      icon: 'ion-ios-megaphone'
    },
    {
      text: 'Отчеты',
      path: '/about',
      icon: 'ion-ios-business'
    },
    {
      text: 'Справочники',
      path: '/blog',
      icon: 'ion-ios-bonfire'
    },
    {
      text: 'Избранное',
      path: '/portfolio',
      icon: 'ion-ios-briefcase'
    },
  ]

  return (
    <div className="App">
      <ResponsiveNavigation
        navLinks = {navLinks}
        logo = {logo}
        siblogo = {siblogo}
        background = "#FBCE20"
        hoverBackground = "white"
        linkColor = "#333"
      />
      <Router>
        <Contact path="/contact" />
        <Home path="/" />
        <Portfolio path="/portfolio" />
        <Blog path="/blog" />
        <About path="/about" />
      </Router>
    </div>
  );
}

export default App;