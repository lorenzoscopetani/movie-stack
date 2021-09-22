import React, { useState, useRef, useContext } from 'react';
import { GlobalContext } from '../../context/GlobalContext';
import { Link, useHistory } from 'react-router-dom';
import ShowPassword from '../../components/ShowPassword/ShowPassword';
import './SignupPage.css';

const SignupPage = () => {
	const emailRef = useRef();
	const passwordRef = useRef();
	const passwordConfirmRef = useRef();
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const { signup, showPass } = useContext(GlobalContext);
	const history = useHistory();

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (passwordRef.current.value !== passwordConfirmRef.current.value) {
			setError('Password do not match');
		}

		try {
			setError('');
			setLoading(true);
			await signup(emailRef.current.value, passwordRef.current.value);
			history.push('/');
		} catch {
			setError('Failed to create an account');
		}

		setLoading(false);
	};

	return (
		<div className="signup-page">
			<div className="signup-page__gradient" />
			<div className="signup-page__container">
				<h2 className="signup-page__title">
					Sign <span>Up</span>
				</h2>
				{error && <p>{error}</p>}
				<form className="signup-form" onSubmit={handleSubmit}>
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
					<div className="form-group">
						<label>Confirm Password</label>
						<input
							type={showPass ? 'text' : 'password'}
							className="form-group__input"
							ref={passwordConfirmRef}
							required
						/>
					</div>
					<ShowPassword />
					<button disabled={loading}>Sign Up</button>
				</form>
				<p>
					Already have an account? <Link to={'/login'}>Log In</Link>
				</p>
			</div>
		</div>
	);
};

export default SignupPage;
