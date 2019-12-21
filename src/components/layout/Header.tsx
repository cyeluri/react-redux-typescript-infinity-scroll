import React, { ReactElement } from 'react'
import { Link } from 'react-router-dom';
import logo from '../../logo.svg';

//Arrow Function
const Header = (): ReactElement => {
    return (
            <div className='headerStyle'>
                <img src={logo} className="navbar-brand App-logo" alt='logo'/>
                    <Link to="/cards" className='linkStyle'>Cards</Link> |
                    <Link to="/about" className='linkStyle'>About</Link>
            </div>
    )
}

export default Header;