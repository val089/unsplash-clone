import React, { useState, useEffect } from 'react';
import './Autocomplete.scss';
import SearchBox from '../SearchBox';
import Option from './components/Option';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	useHistory,
} from 'react-router-dom';

const Autocomplete = () => {
	const [activeOption, setActiveOption] = useState(0);
	const [filteredOptions, setFilteredOptions] = useState([]);
	const [search, setSearch] = useState('');
	const [options, setOptions] = useState([]);

	const history = useHistory();

	const routeChange = (search) => {
		let path = search;
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

	const apiUrl = `https://api.unsplash.com/search/photos?per_page=30&query=${search}`;
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
				setOptions(filterData(data.results));
			})
			.catch((error) => {
				console.error(error);
			});
	}, [apiUrl]);

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
		console.log(filteredOptions);
		setSearch(inputValue);
	};

	const onClick = (event) => {
		setSearch(event.currentTarget.innerText);
		routeChange(event.currentTarget.innerText);
	};

	const onSubmit = () => {
		routeChange(filteredOptions[activeOption]);
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
				console.log(activeOption);
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
				<SearchBox
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
