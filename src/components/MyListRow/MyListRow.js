import React, { useContext } from 'react';
import { GlobalContext } from '../../context/GlobalContext';
import './MyListRow.css';
import MoviePoster from '../MoviePoster/MoviePoster';

const MyListRow = () => {
	const { myList } = useContext(GlobalContext);
	return (
		<div className="mylist-row">
			<h1>My List</h1>
			<div className="mylist-row__posters">
				{myList.map((movie) => (
					<MoviePoster key={movie.id} movie={movie} />
				))}
			</div>
		</div>
	);
};

export default MyListRow;
