import React from 'react';
import { Link } from 'react-router-dom';
import './MoviePoster.css';

const MoviePoster = ({ movie }) => {
	const base_url = 'https://image.tmdb.org/t/p/original/';
	return (
		<Link to={`/${movie.id}`}>
			{movie.poster_path ? (
				<img
					className="movie-poster"
					src={`${base_url}${movie.poster_path}`}
					alt={movie.title}
				/>
			) : (
				<div className="filled-poster" />
			)}
		</Link>
	);
};

export default MoviePoster;
