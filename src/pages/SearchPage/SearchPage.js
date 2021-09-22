import React, { useState } from 'react';
import axios from '../../axios';
import MoviePoster from '../../components/MoviePoster/MoviePoster';
import './SearchPage.css';
import BeatLoader from 'react-spinners/BeatLoader';

const SearchPage = () => {
	const [query, setQuery] = useState('');
	const [results, setResults] = useState([]);
	const [loading, setLoading] = useState(false);

	const handleMovies = async (e) => {
		e.preventDefault();
		setQuery(e.target.value);
		try {
			setLoading(true);
			const res = await axios.get(
				`/search/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1&include_adult=false&query=${query}`
			);
			setResults(res.data.results);
		} catch (error) {
			setResults([]);
		}
		setLoading(false);
	};

	return (
		<div className="search-page">
			<form className="search-page__form" onSubmit={handleMovies}>
				<i className="fas fa-search"></i>
				<input
					type="text"
					placeholder="Search for a movie"
					value={query}
					onChange={handleMovies}
				/>
			</form>
			<div className="search-page__container">
				{loading ? (
					<BeatLoader color={'#fff'} loading={loading} size={18} margin={5} />
				) : (
					results.length > 0 &&
					results.map((movie) => <MoviePoster movie={movie} key={movie.id} />)
				)}
			</div>
		</div>
	);
};

export default SearchPage;
