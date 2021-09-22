import React, { useState, useEffect, useContext } from 'react';
import { GlobalContext } from '../../context/GlobalContext';
import axios from '../../axios';
import './MoviePage.css';
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';
import BeatLoader from 'react-spinners/BeatLoader';

const MoviePage = (props) => {
	const [movie, setMovie] = useState({});
	const [trailerUrl, setTrailerUrl] = useState('');
	const { myList, addToMyList, removeFromMyList } = useContext(GlobalContext);

	const [loading, setLoading] = useState(false);

	const movieId = props.match.params.id;
	const movieUrl = `/movie/${movieId}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`;

	const base_url = 'https://image.tmdb.org/t/p/original/';

	let storedMovie = myList.find((item) => item.id == movieId);

	useEffect(() => {
		fetchData();
	}, []);

	const fetchData = async () => {
		try {
			const res = await axios.get(movieUrl);
			setMovie(res.data);
		} catch (error) {
			console.log(error);
		}
	};

	const watchTrailer = (movie) => {
		setLoading(true);
		if (trailerUrl) {
			setTrailerUrl('');
			setLoading(false);
		} else {
			try {
				movieTrailer(movie?.title || '').then((url) => {
					const urlParams = new URLSearchParams(new URL(url).search);
					setTrailerUrl(urlParams.get('v'));
					setLoading(false);
				});
			} catch (error) {
				console.log(error);
			}
		}
	};

	const opts = {
		height: '650',
		width: '100%',
		playerVars: {
			autoPlay: 1,
		},
	};

	return (
		<div className="movie-page">
			<div className="movie-page__container">
				<img src={`${base_url}${movie.poster_path}`} alt={movie.title} />
				<div className="movie-page__container__content">
					<h1 className="movie__title">{movie.title}</h1>
					<p className="movie__date">{movie.release_date}</p>
					<p className="movie__vote">{movie.vote_average}</p>
					<p className="movie__description">
						<span>Description: </span> {movie.overview}
					</p>
					<ul className="movie__genres">
						{movie.genres &&
							movie.genres.map((item) => <li key={item.id}>{item.name}</li>)}
					</ul>
					<div className="movie__buttons">
						<button onClick={() => watchTrailer(movie)}>
							<i className="far fa-play-circle"></i>
							{trailerUrl ? 'Close Trailer' : 'Play Trailer'}
						</button>
						<button
							onClick={
								storedMovie
									? () => removeFromMyList(movie)
									: () => addToMyList(movie)
							}
						>
							<i className={storedMovie ? 'fas fa-check' : 'fas fa-plus'}></i>
							My List
						</button>
					</div>
				</div>
			</div>
			{loading ? (
				<BeatLoader color={'#fff'} loading={loading} size={18} margin={5} />
			) : (
				trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />
			)}
		</div>
	);
};

export default MoviePage;
