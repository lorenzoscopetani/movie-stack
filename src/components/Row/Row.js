import React, { useState, useEffect } from 'react';
import './Row.css';
import axios from '../../axios';
import MoviePoster from '../MoviePoster/MoviePoster';

const Row = ({ title, fetchUrl }) => {
	const [movies, setMovies] = useState([]);

	useEffect(() => {
		async function fetchData() {
			const request = await axios.get(fetchUrl);
			setMovies(request.data.results);
			return request;
		}
		fetchData();
	}, [fetchUrl]);

	return (
		<div className="row">
			<h1>{title}</h1>
			<div className="row__posters">
				{movies.map((movie) => (
					<MoviePoster key={movie.id} movie={movie} />
				))}
			</div>
		</div>
	);
};

export default Row;
