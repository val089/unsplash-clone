import React, { useEffect, useState } from 'react';
import './Gallery.scss';

const Gallery = ({ searchValue }) => {
	const [photos, setPhotos] = useState();

	const apiUrl = `https://api.unsplash.com/search/photos?per_page=30&query=${searchValue}&orientation=squarish`;
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

	return (
		<div className="gallery">
			{photos &&
				photos.map((item) => (
					<div key={item.id} className="photo">
						<img src={item.urls.regular} alt="me" />
					</div>
				))}
		</div>
	);
};

export default Gallery;
