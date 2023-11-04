import React from 'react';
import './Header.css';

const Header = () => {
    return (
        <header className="header-container">
            <div>
                <div className="logo"/>
            </div>

            <ul className="menu">
                <li>
                    <a href="https://attra.me/">Attractor Network</a>
                </li>
                <li>
                    <a href="https://github.com/attractornetwork">GitHub</a>
                </li>
            </ul>
        </header>
    );
}

export default Header;
