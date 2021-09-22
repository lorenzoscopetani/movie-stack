import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ closeMobileMenu, menuOpen }) => {
	return (
		<ul className={menuOpen ? 'navbar active' : 'navbar'}>
			<li>
				<Link to={'/search'} onClick={closeMobileMenu}>
					Search
				</Link>
			</li>
			<li>
				<Link to={'/mylist'} onClick={closeMobileMenu}>
					My List
				</Link>
			</li>
			<li>
				<Link to={'/profile'}>
					<i className="fas fa-user-circle"></i>
				</Link>
			</li>
		</ul>
	);
};

export default Navbar;
