import React, { useState, useEffect } from 'react';
import Photo from '../../components/Photo';

import './GalleryResults.scss';
import ReactPlaceholder from 'react-placeholder';
import 'react-placeholder/lib/reactPlaceholder.css';

const GalleryResults = ({ data }) => {
	const [ready, setReady] = useState(false);

	useEffect(() => {
		setTimeout(() => {
			setReady(true);
		}, 1000);
	}, []);

	return (
		<section className="gallery-results">
			{data.map((photo) => (
				<ReactPlaceholder
					showLoadingAnimation
					type="rect"
					color="#ddd"
					style={{ width: 300, height: 300, margin: 10 }}
					ready={ready}
					key={photo.id}
				>
					<Photo
						key={photo.id}
						img={photo.urls.regular}
						alt={photo.alt_description}
						author={photo.user.name}
						location={photo.user.location}
					/>
				</ReactPlaceholder>
			))}
		</section>
	);
};

export default GalleryResults;
