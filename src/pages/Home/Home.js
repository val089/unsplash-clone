import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './Home.scss';
import Autocomplete from '../../components/Autocomplete';

const Home = () => {
	// const [options, setOptions] = useState([]);

	//transfer filterData to the redux
	// const filterData = (data) => {
	// 	let preData = data.filter(
	// 		(el) =>
	// 			typeof el.alt_description !== 'undefined' &&
	// 			el.alt_description !== null
	// 	);
	// 	let newData = preData.map((el) => el.alt_description.split(' ')).flat();
	// 	let set = new Set(newData);
	// 	return [...set];
	// };

	//transfer fetch data to the redux
	// const apiUrl =
	// 	'https://api.unsplash.com/search/photos?per_page=30&query=random';
	// const _apiKey = 'IiHTjYC5n1BhVTDfhpUAo-m5H1qPHy4CXT-WfrMDO4A';

	// useEffect(() => {
	// 	fetch(apiUrl, {
	// 		method: 'GET',
	// 		headers: {
	// 			Authorization: `Client-ID ${_apiKey}`,
	// 		},
	// 	})
	// 		.then((response) => response.json())
	// 		.then((data) => {
	// 			setOptions(filterData(data.results));
	// 		})
	// 		.catch((error) => {
	// 			console.error(error);
	// 		});
	// }, [options]);

	return (
		<header className="home">
			<Autocomplete />
		</header>
	);
};

// Home.propTypes = {
// 	options: PropTypes.instanceOf(Array).isRequired,
// };

export default Home;
