import React, { useContext } from 'react';
import { GlobalContext } from '../../context/GlobalContext';
import './HomePage.css';
import Row from '../../components/Row/Row';
import requests from '../../requests';
import Banner from '../../components/Banner/Banner';
import MyListRow from '../../components/MyListRow/MyListRow';

const HomePage = () => {
	const { myList } = useContext(GlobalContext);
	return (
		<div className="home-page">
			<Banner />
			<Row title="Trending Now" fetchUrl={requests.fetchTrending} />
			{myList.length > 0 && <MyListRow />}
			<Row title="Top Rated" fetchUrl={requests.fetchTopRated} />
			<Row title="Action Movies" fetchUrl={requests.fetchActionsMovies} />
			<Row title="Comedy Movies" fetchUrl={requests.fetchComedyMovies} />
			<Row title="Horror Movies" fetchUrl={requests.fetchHorrorMovies} />
			<Row title="Romance Movies" fetchUrl={requests.fetchRomanceMovies} />
			<Row title="Documentaries" fetchUrl={requests.fetchDocumentaries} />
		</div>
	);
};

export default HomePage;
