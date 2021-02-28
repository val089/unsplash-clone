import React, { useEffect, useState } from 'react';
import './Gallery.scss';
import { Link } from 'react-router-dom';
import SearchBarGallery from '../../components/SearchBarGallery';
import GalleryResults from '../../components/GalleryResults';
import { apiUrl, _apiKey } from '../../constants';

const Gallery = ({ searchValue }) => {
	const [photos, setPhotos] = useState([]);
	const [value, setValue] = useState('');
	const [isLoading, setLoading] = useState(true);
	const [hasError, setError] = useState(false);

	useEffect(() => {
		fetch(apiUrl + value, {
			method: 'GET',
			headers: {
				Authorization: `Client-ID ${_apiKey}`,
			},
		})
			.then((response) => response.json())
			.then((data) => {
				setPhotos(data.results);
				setLoading(false);
			})
			.catch((error) => {
				setError(true);
			});
	}, [value]);

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
					<SearchBarGallery searchPhotoValue={searchPhotoValue} />
				</header>
				<h1 className="gallery__title">{value || searchValue}</h1>
				{isLoading && <p className="gallery__loading">Loading...</p>}
				{hasError && (
					<p className="gallery__error">An error has occurred</p>
				)}
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
