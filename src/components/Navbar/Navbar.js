import React, { useContext } from 'react';
import { GlobalContext } from '../../context/GlobalContext';
import { Link, useHistory } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ closeMobileMenu, menuOpen }) => {
	const { logout } = useContext(GlobalContext);
	const history = useHistory();

	async function handleClick() {
		try {
			await logout();
			history.push('/login');
			closeMobileMenu();
		} catch {
			console.log('Failed to log out');
		}
	}

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
			<button onClick={handleClick}>Log Out</button>
		</ul>
	);
};

export default Navbar;
