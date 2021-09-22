import React, { useContext } from 'react';
import { GlobalContext } from '../../context/GlobalContext';
import { Link, useHistory } from 'react-router-dom';
import './ProfilePage.css';

const ProfilePage = () => {
	const { logout, currentUser, myList } = useContext(GlobalContext);
	const history = useHistory();

	async function handleClick() {
		try {
			await logout();
			history.push('/login');
		} catch {
			console.log('Failed to log out');
		}
	}

	return (
		<div className="profile-page">
			<div className="profile-page__container">
				<h1>
					<i className="fas fa-user-circle"></i> Profile
				</h1>
				<p className="profile-page__container__p">
					<strong>Email: </strong>
					{currentUser.email}
				</p>
				<p className="profile-page__container__p">
					<strong>My List: </strong>
					{myList.length} movies
				</p>
				<button className="profile-page__container__button">
					<Link to={'/update_profile'}>Update Profile</Link>
				</button>
				<p className="profile-page__container__logout" onClick={handleClick}>
					Log Out
				</p>
			</div>
		</div>
	);
};

export default ProfilePage;
