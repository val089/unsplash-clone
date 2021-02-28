import React from 'react';
import './Option.scss';

const Option = ({ className, option, onClick }) => {
	return (
		<li className={className} onClick={onClick}>
			{option}
		</li>
	);
};

export default Option;
