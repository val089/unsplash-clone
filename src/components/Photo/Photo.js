import React, { useState } from 'react';
import './Photo.scss';
import Modal from '../Modal';
import PropTypes from 'prop-types';

const Photo = ({ img, alt, author, location }) => {
	const [modalActive, setModalActive] = useState(false);

	const openModal = () => {
		setModalActive(true);
	};

	const closeModal = () => {
		setModalActive(false);
	};

	return (
		<div className="photo">
			<img
				className="photo__img"
				src={img}
				alt={alt}
				onClick={openModal}
			/>

			<Modal active={modalActive} setActive={setModalActive}>
				<header className="photo__modal-header">
					<h1 className="photo__modal-author">Author: {author}</h1>
					<button className="photo__modal-btn" onClick={closeModal}>
						CLOSE
					</button>
				</header>
				<img className="photo__modal-img" src={img} alt={alt}></img>
				<p className="photo__modal-location">
					Location:{' '}
					{location === null || typeof location === 'undefined'
						? Photo.defaultProps.location
						: location}
				</p>
			</Modal>
		</div>
	);
};

Photo.defaultProps = {
	alt: 'photo',
	author: 'author',
	location: 'somewhere',
};

Photo.propTypes = {
	author: PropTypes.string,
	alt: PropTypes.string,
	location: PropTypes.string,
};

export default Photo;
