import React from 'react';


const Header = (props) => (
  <header className='navbar is-primary' id='header' >
    <div className='navbar-brand'>
      <a id='logo' className='navbar-item' href='/'>Tembo</a>
    </div>
    <div id='navMenu' className='navbar-menu'>
      <div className='navbar-end'>
        <a className='navbar-item' href='/'>Work</a>
        <a className='navbar-item' href='/'>About</a>
        <a className='navbar-item' href='/'>Careers</a>
        <a className='navbar-item' href='/'>News</a>
        <a className='navbar-item' href='/'>Contact</a>
      </div>
    </div>
  </header>
)
export default Header;