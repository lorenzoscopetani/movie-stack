import React, { useState, useRef, useContext } from 'react';
import { GlobalContext } from '../../context/GlobalContext';
import { Link, useHistory } from 'react-router-dom';
import ShowPassword from '../../components/ShowPassword/ShowPassword';
import './LoginPage.css';

const LoginPage = () => {
	const emailRef = useRef();
	const passwordRef = useRef();
	const { login, showPass } = useContext(GlobalContext);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');
	const history = useHistory();

	async function handleSubmit(e) {
		e.preventDefault();

		try {
			setError('');
			setLoading(true);
			await login(emailRef.current.value, passwordRef.current.value);
			history.push('/');
		} catch {
			setError('Failed to login');
		}

		setLoading(false);
	}

	return (
		<div className="login-page">
			<div className="login-page__gradient" />
			<div className="login-page__container">
				<h2 className="login-page__title">
					Log <span>In</span>
				</h2>
				{error && <p>{error}</p>}
				<form className="login-form" onSubmit={handleSubmit}>
					<div className="form-group">
						<label>Email</label>
						<input
							type="email"
							className="form-group__input"
							ref={emailRef}
							required
						/>
					</div>
					<div className="form-group">
						<label>Password</label>
						<input
							type={showPass ? 'text' : 'password'}
							className="form-group__input"
							ref={passwordRef}
							required
						/>
					</div>
					<ShowPassword />
					<button disabled={loading}>Log In</button>
				</form>
				<p>
					Need an account? <Link to={'/signup'}>Sign Up</Link>
				</p>
			</div>
		</div>
	);
};

export default LoginPage;
