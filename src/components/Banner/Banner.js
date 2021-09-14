import React, { useState, useEffect, useContext } from 'react';
import { GlobalContext } from '../../context/GlobalContext';
import './Banner.css';
import axios from '../../axios';
import requests from '../../requests';
import { Link } from 'react-router-dom';

const Banner = () => {
	const [movie, setMovie] = useState([]);
	const { myList, addToMyList, removeFromMyList } = useContext(GlobalContext);

	useEffect(() => {
		async function fetchData() {
			const request = await axios.get(requests.fetchTrending);
			setMovie(
				request.data.results[
					Math.floor(Math.random() * request.data.results.length - 1)
				]
			);
			return request;
		}

		fetchData();
	}, []);

	let storedMovie = myList.find((item) => item.id === movie.id);

	return (
		<div
			className="banner"
			style={{
				backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
				backgroundSize: 'cover',
				backgroundPosition: 'center center',
			}}
		>
			<div className="banner__contents">
				<h1 className="banner__title">
					{movie?.title || movie?.name || movie?.original_name}
				</h1>
				<div className="banner__buttons">
					<button className="banner__button">
						<Link to={`/${movie.id}`}>
							<i className="fas fa-info-circle"></i>Info
						</Link>
					</button>
					<button
						className="banner__button"
						onClick={
							storedMovie
								? () => removeFromMyList(movie)
								: () => addToMyList(movie)
						}
					>
						<i className={storedMovie ? 'fas fa-check' : 'fas fa-plus'}></i>My
						List
					</button>
				</div>
			</div>
		</div>
	);
};

export default Banner;
