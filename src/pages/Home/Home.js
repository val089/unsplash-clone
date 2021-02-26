import React from 'react';
import './Home.scss';
import Autocomplete from '../../components/Autocomplete';

const Home = () => {
	return (
		<header className="home">
			<Autocomplete />
		</header>
	);
};

export default Home;
