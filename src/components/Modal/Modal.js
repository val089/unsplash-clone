import React from 'react';
import clsx from 'clsx';
import './Modal.scss';

const Modal = ({ active, setActive, children }) => {
	return (
		<div
			className={clsx(active && 'active', 'modal')}
			onClick={() => setActive(false)}
		>
			<div
				className={clsx(active && 'active', 'modal__content')}
				onClick={(e) => e.stopPropagation()}
			>
				{children}
			</div>
		</div>
	);
};

export default Modal;
