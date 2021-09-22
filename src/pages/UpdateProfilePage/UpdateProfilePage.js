import React, { useState, useRef, useContext } from 'react';
import { GlobalContext } from '../../context/GlobalContext';
import { Link, useHistory } from 'react-router-dom';
import ShowPassword from '../../components/ShowPassword/ShowPassword';
import './UpdateProfilePage.css';

const UpdateProfilePage = () => {
	const passwordRef = useRef();
	const passwordConfirmRef = useRef();
	const { currentUser, updatePassword, showPass } = useContext(GlobalContext);
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const history = useHistory();

	function handleSubmit(e) {
		e.preventDefault();
		if (passwordRef.current.value !== passwordConfirmRef.current.value) {
			return setError('Password do not match');
		}
		const promises = [];
		setLoading(true);
		setError('');
		if (passwordRef.current.value) {
			promises.push(updatePassword(passwordRef.current.value));
		}

		Promise.all(promises)
			.then(() => {
				history.push('/profile');
			})
			.catch(() => {
				setError('Failed to update profile');
			})
			.finally(() => {
				setLoading(false);
			});
	}
	return (
		<div className="update-profile-page">
			<div className="update-profile-page__container">
				<h1>
					<i className="fas fa-pen"></i> Update profile
				</h1>
				{error && <p>{error}</p>}
				<form onSubmit={handleSubmit} className="update-profile-form">
					<div className="form__group">
						<label>Password</label>
						<input
							type={showPass ? 'text' : 'password'}
							ref={passwordRef}
							placeholder="Leave blank to keep the same"
						/>
					</div>
					<div className="form__group">
						<label>Confirm Password</label>
						<input
							type={showPass ? 'text' : 'password'}
							ref={passwordConfirmRef}
							placeholder="Leave blank to keep the same"
						/>
					</div>
					<ShowPassword />
					<button disabled={loading}>Update Profile</button>
				</form>
				<p>
					<Link to={'/profile'}>Cancel</Link>
				</p>
			</div>
		</div>
	);
};

export default UpdateProfilePage;
