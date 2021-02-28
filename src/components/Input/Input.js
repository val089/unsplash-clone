import React from 'react';
import './Input.scss';

const Input = ({ onChange, value, onKeyDown }) => {
	return (
		<input
			type="text"
			className="search-box"
			name="search"
			onChange={onChange}
			value={value}
			onKeyDown={onKeyDown}
			autoComplete="off"
			placeholder="Search Photos"
		/>
	);
};

export default Input;
