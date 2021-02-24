import React, { useState, useEffect } from 'react';
import './Autocomplete.scss';
import SearchBox from '../SearchBox';

const Autocomplete = () => {
	const [activeOption, setActiveOption] = useState(0);
	const [filteredOptions, setFilteredOptions] = useState([]);
	const [showOptions, setShowOptions] = useState(false);
	const [inputValue, setInputValue] = useState('');
	const [options, setOptions] = useState(['car', 'bmw', 'ford']);

	const filterData = (data) => {
		let preData = data.filter(
			(el) =>
				typeof el.alt_description !== 'undefined' &&
				el.alt_description !== null
		);
		let newData = preData.map((el) => el.alt_description.split(' ')).flat();
		let set = new Set(newData);
		return [...set];
	};

	const apiUrl = `https://api.unsplash.com/search/photos?per_page=30&query=${inputValue}`;
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
				console.log(filterData(data.results));
				setOptions(filterData(data.results));
			})
			.catch((error) => {
				console.error(error);
			});
	}, [inputValue, apiUrl]);

	const onChange = (event) => {
		const inputValue = event.target.value;

		const filteredOptions = options.filter(
			(option) =>
				option.toLowerCase().indexOf(inputValue.toLowerCase()) > -1
		);
		console.log(filteredOptions);
		setFilteredOptions(filteredOptions);
		setShowOptions(true);
		setInputValue(inputValue);
	};

	const onClick = (event) => {
		setShowOptions(false);
		setInputValue(event.currentTarget.innerText);
	};

	const onKeyDown = (event) => {
		if (event.keyCode === 13) {
			setShowOptions(false);
			setInputValue(filteredOptions[activeOption]);
		} else if (event.keyCode === 38) {
			if (activeOption === 0) {
				return;
			}
			setActiveOption(activeOption - 1);
		} else if (event.keyCode === 40) {
			if (activeOption === filteredOptions.length - 1) {
				console.log(activeOption);
				return;
			}
			setActiveOption(activeOption + 1);
		}
	};

	let optionList;
	if (showOptions && inputValue.length > 2) {
		if (filteredOptions.length) {
			optionList = (
				<ul className="options">
					{filteredOptions.map((option, index) => {
						let className;
						if (index === activeOption) {
							className = 'option-active';
						}
						return (
							<li
								className={className}
								key={option}
								// onClick={onClick}
							>
								{option}
							</li>
						);
					})}
				</ul>
			);
		} else {
			optionList = (
				<div className="no-options">
					<em>No Option!</em>
				</div>
			);
		}
	}

	return (
		<form className="form">
			<div className="form__group">
				<label className="form__label" htmlFor="search"></label>
				<SearchBox
					onChange={onChange}
					value={inputValue}
					// onKeyDown={onKeyDown}
				/>
				{optionList}
			</div>
		</form>
	);
};

export default Autocomplete;
