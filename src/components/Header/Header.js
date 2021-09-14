import React, { useState, useContext } from 'react';
import { GlobalContext } from '../../context/GlobalContext';
import { Link } from 'react-router-dom';
import './Header.css';
import Navbar from '../Navbar/Navbar';

const Header = () => {
	const { currentUser } = useContext(GlobalContext);
	const [menuOpen, setMenuOpen] = useState(false);

	const handleMenuOpen = () => setMenuOpen(!menuOpen);
	const closeMobileMenu = () => setMenuOpen(false);

	return (
		<header className="header">
			<h1 className="header__logo">
				<Link to={'/'}>
					Movie<span>Stack</span>
				</Link>
			</h1>
			{currentUser && <div className="hamburger" onClick={handleMenuOpen}>
				<i className={menuOpen ? 'fas fa-times' : 'fas fa-bars'}></i>
			</div>}
			
			{currentUser && (
				<Navbar closeMobileMenu={closeMobileMenu} menuOpen={menuOpen} />
			)}
		</header>
	);
};

export default Header;
