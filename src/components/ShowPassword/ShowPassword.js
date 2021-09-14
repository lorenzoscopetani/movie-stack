import React, { useContext } from 'react';
import { GlobalContext } from '../../context/GlobalContext';
import './ShowPassword.css';

const ShowPassword = () => {
	const { showPass, setShowPass } = useContext(GlobalContext);

	const showPassword = () => {
		setShowPass(!showPass);
	};

	return (
		<div>
			<div className="show-password">
				<i
					className={showPass ? 'far fa-eye' : 'far fa-eye-slash'}
					onClick={showPassword}
				></i>
				<p>Show Password</p>
			</div>
		</div>
	);
};

export default ShowPassword;
