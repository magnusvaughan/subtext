    // resources/assets/js/components/Header.js

    import React from 'react'
    import { Link } from 'react-router-dom'

    const Header = () => (
      <div>
        <nav className='navbar navbar-expand-md navbar-light navbar-laravel'>
          <div className='container'>
            <Link className='navbar-brand' to='/'>&#x21B0;</Link>
          </div>
        </nav>
        <h1 className="site-header">Radiohead - In GIFs</h1>
      </div>
    )

    export default Header