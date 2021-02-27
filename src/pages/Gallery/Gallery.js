import React, { useEffect, useState } from 'react';
import './Gallery.scss';
import { Link } from 'react-router-dom';
import Photo from '../../components/Photo';

const Gallery = ({ searchValue }) => {
	const [photos, setPhotos] = useState([]);

	const apiUrl = `https://api.unsplash.com/search/photos?per_page=30&query=${searchValue}`;
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

	if (searchValue) {
		return (
			<div className="gallery">
				{photos &&
					photos.map((photo) => (
						<Photo
							key={photo.id}
							img={photo.urls.regular}
							alt={photo.alt_description}
						/>
					))}
			</div>
		);
	} else {
		return <Link to="/">Back</Link>;
	}
};

export default Gallery;
