// import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './Gallery.scss';
import { Link } from 'react-router-dom';
import SearchBar from '../../components/SearchBar';
import GalleryResults from '../../components/GalleryResults';

const Gallery = ({ searchValue }) => {
	const [photos, setPhotos] = useState([]);
	const [value, setValue] = useState('');

	const apiUrl = `https://api.unsplash.com/search/photos?per_page=30&query=${value}`;
	const _apiKey = 'IiHTjYC5n1BhVTDfhpUAo-m5H1qPHy4CXT-WfrMDO4A';
	useEffect(() => {
		fetch(apiUrl, {
			method: 'GET',
			headers: {
				Authorization: `Client-ID ${_apiKey}`,
			},
		})
			.then((response) => response.json())
			.then((data) => {
				setPhotos(data.results);
			})
			.catch((error) => {
				console.error(error);
			});
	}, [apiUrl]);

	useEffect(() => {
		setValue(searchValue);
	}, [searchValue]);

	const searchPhotoValue = (value) => {
		setValue(value);
	};

	if (photos && value) {
		return (
			<section className="gallery">
				<header className="gallery__search">
					<SearchBar searchPhotoValue={searchPhotoValue} />
				</header>
				<h1 className="gallery__title">{value || searchValue}</h1>
				<GalleryResults data={photos} />
			</section>
		);
	} else {
		return (
			<Link to="/" className="back-link">
				Back
			</Link>
		);
	}
};

export default Gallery;
