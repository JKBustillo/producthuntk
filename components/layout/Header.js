import React from 'react';
import Link from 'next/link';
import Search from '../ui/Search';
import Navigation from './Navigation';

const Header = () => {
    return (
        <header>
            <div>
                <div>
                    <p>P</p>

                    <Search />

                    <Navigation />
                </div>

                <div>
                    <p>Hi, Jose</p>

                    <button type="button">Log Out</button>

                    <Link href="/">Login</Link>
                    <Link href="/">Register</Link>
                </div>
            </div>
        </header>
    );
}
 
export default Header;