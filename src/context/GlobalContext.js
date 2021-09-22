import React, { useState, useEffect, createContext } from 'react';
import { auth } from '../firebase';

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState();
	const [loading, setLoading] = useState(true);
	const [showPass, setShowPass] = useState(false);
	const [myList, setMyList] = useState(
		localStorage.getItem('myList')
			? JSON.parse(localStorage.getItem('myList'))
			: []
	);

	useEffect(() => {
		localStorage.setItem('myList', JSON.stringify(myList));
	}, [myList]);

	const signup = (email, password) => {
		return auth.createUserWithEmailAndPassword(email, password);
	};

	const login = (email, password) => {
		return auth.signInWithEmailAndPassword(email, password);
	};

	const logout = () => {
		return auth.signOut();
	};

	const updatePassword = (password) => {
		return currentUser.updatePassword(password);
	};

	const addToMyList = (movie) => {
		setMyList([...myList, movie]);
	};

	const removeFromMyList = (movie) => {
		setMyList(myList.filter((item) => item.id !== movie.id));
	};

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((user) => {
			setCurrentUser(user);
			setLoading(false);
		});
		return unsubscribe;
	}, []);

	const value = {
		currentUser,
		showPass,
		myList,
		setShowPass,
		setMyList,
		addToMyList,
		removeFromMyList,
		signup,
		login,
		logout,
		updatePassword,
	};

	return (
		<GlobalContext.Provider value={value}>
			{!loading && children}
		</GlobalContext.Provider>
	);
};
