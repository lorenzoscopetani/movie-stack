import React, { useState } from 'react';
import axios from '../../axios';
import MoviePoster from '../../components/MoviePoster/MoviePoster';
import './SearchPage.css';

const SearchPage = () => {
	const [query, setQuery] = useState('');
	const [results, setResults] = useState([]);

	const onChange = async (e) => {
		e.preventDefault();
		setQuery(e.target.value);

		try {
			const res = await axios.get(
				`/search/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1&include_adult=false&query=${e.target.value}`
			);
			setResults(res.data.results);
		} catch (error) {
			setResults([]);
		}
	};

	return (
		<div className="search-page">
			<form className="search-page__form">
				<i className="fas fa-search"></i>
				<input
					type="text"
					placeholder="Search for a movie"
					value={query}
					onChange={onChange}
				/>
			</form>
			<div className="search-page__container">
				{results.length > 0 &&
					results.map((movie) => <MoviePoster movie={movie} key={movie.id} />)}
			</div>
		</div>
	);
};

export default SearchPage;
