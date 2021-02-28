import React from 'react';
import Photo from '../../components/Photo';
import './GalleryResults.scss';

const GalleryResults = ({ data }) => {
	return (
		<section className="gallery-results">
			{data.map((photo) => (
				<Photo
					key={photo.id}
					img={photo.urls.regular}
					alt={photo.alt_description}
					author={photo.user.name}
					location={photo.user.location}
				/>
			))}
		</section>
	);
};

export default GalleryResults;