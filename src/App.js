import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { GlobalProvider } from './context/GlobalContext';
import './App.css';
import Header from './components/Header/Header';
import HomePage from './pages/HomePage/HomePage';
import LoginPage from './pages/LoginPage/LoginPage';
import SignupPage from './pages/SignupPage/SignupPage';
import PrivateRoute from './components/PrivateRoute';
import MoviePage from './pages/MoviePage/MoviePage';
import SearchPage from './pages/SearchPage/SearchPage';
import MyListPage from './pages/MyListPage/MyListPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import UpdateProfilePage from './pages/UpdateProfilePage/UpdateProfilePage';

function App() {
	return (
		<div className="App">
			<Router>
				<GlobalProvider>
					<Header />
					<Switch>
						<PrivateRoute exact path="/" component={HomePage} />
						<Route exact path="/login" component={LoginPage} />
						<Route exact path="/signup" component={SignupPage} />
						<PrivateRoute exact path="/search" component={SearchPage} />
						<PrivateRoute exact path="/mylist" component={MyListPage} />
						<PrivateRoute exact path="/profile" component={ProfilePage} />
						<PrivateRoute
							exact
							path="/update_profile"
							component={UpdateProfilePage}
						/>
						<PrivateRoute exact path="/:id" component={MoviePage} />
					</Switch>
				</GlobalProvider>
			</Router>
		</div>
	);
}

export default App;
