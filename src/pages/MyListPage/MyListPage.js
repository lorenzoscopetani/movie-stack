import React, { useContext } from 'react';
import { GlobalContext } from '../../context/GlobalContext';
import MoviePoster from '../../components/MoviePoster/MoviePoster';
import './MyListPage.css';

const MyListPage = () => {
	const { myList } = useContext(GlobalContext);
	return (
		<div className="mylist-page">
			<h1>My List</h1>
			<div className="mylist-page__container">
				{myList.length > 0 ? (
					myList.map((movie) => <MoviePoster movie={movie} key={movie.id} />)
				) : (
					<h2 className="message">No movies in your list, add some!</h2>
				)}
			</div>
		</div>
	);
};

export default MyListPage;
