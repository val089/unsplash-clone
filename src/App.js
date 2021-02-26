import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Gallery from './pages/Gallery';

function App() {
	const [searchValue, setSearchValue] = useState('');

	const searchPhotoValue = (value) => {
		setSearchValue(value);
	};

	return (
		<div className="App">
			<Router>
				<Switch>
					<Route path="/" exact>
						<Home searchPhotoValue={searchPhotoValue} />
					</Route>
					<Route path="/gallery">
						<Gallery searchValue={searchValue} />
					</Route>
				</Switch>
			</Router>
		</div>
	);
}

export default App;
