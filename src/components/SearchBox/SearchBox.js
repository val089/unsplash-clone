import React from 'react';
import './SearchBox';

const SearchBox = ({ onChange, value, onKeyDown }) => {
	return (
		<input
			type="text"
			className="search-box"
			name="search"
			onChange={onChange}
			value={value}
			onKeyDown={onKeyDown}
			autoComplete="off"
		/>
	);
};

export default SearchBox;
