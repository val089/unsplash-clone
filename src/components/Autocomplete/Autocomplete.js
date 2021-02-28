import React, { useState, useEffect } from 'react';
import './Autocomplete.scss';
import Input from '../Input';
import Option from '../Option';
import { useHistory } from 'react-router-dom';
import { apiUrl, _apiKey } from '../../constants';

const Autocomplete = ({ searchPhotoValue }) => {
	const [activeOption, setActiveOption] = useState(0);
	const [filteredOptions, setFilteredOptions] = useState([]);
	const [search, setSearch] = useState('');
	const [options, setOptions] = useState([]);

	const history = useHistory();

	const routeChange = () => {
		let path = '/gallery';
		history.push(path);
	};

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

	useEffect(() => {
		fetch(apiUrl + search, {
			method: 'GET',
			headers: {
				Authorization: `Client-ID ${_apiKey}`,
			},
		})
			.then((response) => response.json())
			.then((data) => {
				setOptions(filterData(data.results));
				console.log(filterData(data.results));
			})
			.catch((error) => {
				console.error(error);
			});
	}, [search]);

	useEffect(() => {
		if (search.length > 2) {
			setFilteredOptions(
				options.filter((option) =>
					option.toLowerCase().includes(search.toLocaleLowerCase())
				)
			);
		}
	}, [options, search]);

	const onChange = (event) => {
		const inputValue = event.target.value;
		setSearch(inputValue);
	};

	const onClick = (event) => {
		setSearch(event.currentTarget.innerText);
		routeChange(event.currentTarget.innerText);
	};

	const onSubmit = (value) => {
		routeChange();
		searchPhotoValue(value);
	};

	const onKeyDown = (event) => {
		if (event.keyCode === 13) {
			event.preventDefault();
			if (filteredOptions.length) {
				setSearch(filteredOptions[activeOption]);
				onSubmit(filteredOptions[activeOption]);
			}
		} else if (event.keyCode === 38) {
			if (activeOption === 0) {
				return;
			}
			setActiveOption(activeOption - 1);
		} else if (event.keyCode === 40) {
			if (activeOption === filteredOptions.length - 1) {
				return;
			}
			setActiveOption(activeOption + 1);
		}
	};

	let optionList;
	if (search.length > 2) {
		if (filteredOptions.length) {
			optionList = (
				<ul className="options">
					{filteredOptions.map((option, index) => {
						let className;
						if (index === activeOption) {
							className = 'option-active';
						}
						return (
							<Option
								onClick={onClick}
								key={option}
								className={className}
								option={option}
							/>
						);
					})}
				</ul>
			);
		} else {
			optionList = <p className="no-options">No Option!</p>;
		}
	}

	return (
		<form className="form">
			<div className="form__group">
				<label className="form__label" htmlFor="search"></label>
				<Input
					onChange={onChange}
					value={search}
					onKeyDown={onKeyDown}
					onSubmit={onSubmit}
				/>
				{optionList}
			</div>
		</form>
	);
};

export default Autocomplete;
