import React from 'react';
import './Home.scss';
import Autocomplete from '../../components/Autocomplete';

const Home = ({ searchPhotoValue }) => {
	return (
		<header className="home">
			<Autocomplete searchPhotoValue={searchPhotoValue} />
		</header>
	);
};

export default Home;
