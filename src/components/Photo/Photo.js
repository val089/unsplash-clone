import React from 'react';
import './Photo.scss';

const Photo = ({ img, alt }) => {
	return (
		<div className="photo">
			<img className="photo__img" src={img} alt={alt} />
		</div>
	);
};

Photo.defaultProps = {
	alt: 'photo',
};

export default Photo;
