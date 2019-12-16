import React, { ReactElement } from 'react'
import { Link } from 'react-router-dom';
 
//Arrow Function
const Header = (): ReactElement => {
    return (
        <div>
        <header className="App-header">
            <div className='headerStyle'>
               <Link to="/cards" className='linkStyle'>Cards</Link>
               <Link to="/about" className='linkStyle'>About</Link>
               <Link to="/credits" className='linkStyle'>Credits</Link>
            </div>
        </header>
        </div>
    )
}

export default Header;